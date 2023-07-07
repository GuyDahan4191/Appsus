import { noteService } from "../services/note.service.js";

import {
  showSuccessMsg,
  showErrorMsg,
  eventBus,
} from "../../../services/event-bus.service.js";

import NoteList from "../cmps/NoteList.js";
import AppHeader from "../cmps/AppHeader.js";
import PinnedNote from "../cmps/PinnedNote.js";
import SideBar from "../cmps/SideBar.js";


export default {
  template: `
          <AppHeader
          @filterByTxt="setFilterByTxt"
           />

           <div className="side-bar-conteiner">
           <SideBar 
           @filterByType="setFilterByType"
           />
           
           <div className="main-content">
          <form @submit.prevent="saveNote" class="add-note">
          <input @change="check" id="user-input" v-model="noteToEdit.info.txt" type="text" placeholder="Take a note...">
           <button>Save</button>

            <select v-model="noteType" >
              <option>NoteTxt</option>
              <option>NoteImg</option>
              <option>NoteTodos</option>
              <option>NoteVideo</option>
            </select>
       </form>
     
       <h2
       v-if="isFilterMode"
       >Search</h2>

       <NoteList
       @openColor="openColor"
       v-if="notes"
       v-if="isFilterMode"
       :notes="filteredNotes" 
       @remove="removeNote"  
       @setColor="setBgColor" 
       @duplicate="duplicateNote" 
       @pin="pinNote" 
       />

<!-- pinned -->
      <h2
      v-if="!isFilterMode"
      >Pinned</h2>

       <NoteList
       @openColor="openColor"
       v-if="notes"
       v-if="!isFilterMode"
       :notes="pinnedNotes" 
       @remove="removeNote"  
       @setColor="setBgColor" 
       @duplicate="duplicateNote" 
       @pin="pinNote" 
       />
<!-- others -->
      <h2
      v-if="!isFilterMode"
      >Others</h2>

       <NoteList
       @openColor="openColor"
       v-if="notes"
       v-if="!isFilterMode"
       :notes="otherNotes" 
       @remove="removeNote"  
       @setColor="setBgColor" 
       @duplicate="duplicateNote" 
       @pin="pinNote" 
       />

       <NoteColor :note ="selectedNote" />
        </div>
       </div>
       
    `,
  created() {
    this.loadNotes(),
      this.loadPinnedNotes()
    document.addEventListener('click', this.handleClick);
  },

  data() {
    return {
      notes: [],
      filterBy: {
        txt: "",
        noteType: "",
      },
      noteToEdit: noteService.getEmptyNote(),
      noteType: "",
      selectedNote: null,
      isFilterMode: false
    };
  },

  methods: {
    loadNotes() {
      noteService.query()
        .then((notes) => {
          this.notes = notes;
        });
    },

    loadPinnedNotes() {
      noteService.query()
        .then((notes) => {
          const pinnedNotes = notes.filter(note => note.isPinned === true);
          this.pinnedNotes = pinnedNotes;
        });
    },

    handleClick() {
      this.isFilterMode = false;
    },

    removeNote(noteId) {
      noteService.remove(noteId)
        .then(() => {
          const noteIdx = this.notes.findIndex((note) => note.id === noteId);
          this.notes.splice(noteIdx, 1);
          showSuccessMsg("Note Removed!");
        });
    },

    saveNote() {
      noteService.save(this.noteToEdit).then((savedNote) => {
        showSuccessMsg("Note added!");
        this.notes.push(savedNote);
        this.noteToEdit = noteService.getEmptyNote();
      });
    },

    setFilterByTxt(filterBy) {
      this.isFilterMode = true
      this.filterBy.txt = filterBy;
    },

    setFilterByType(filterBy) {
      this.isFilterMode = true
      this.filterBy.noteType = filterBy;
    },

    setBgColor(color, noteId) {
      const noteRes = this.notes.find((note => note.id === noteId))
      noteRes.style.backgroundColor = color
      noteService.save(noteRes)
    },

    duplicateNote(noteId) {
      const noteRes = this.notes.find((note) => note.id === noteId);
      noteService.resetId(noteRes)
      noteService.save(noteRes)
        .then(() => {
          showSuccessMsg("Note duplicate!");
          this.loadNotes()
        });
    },

    pinNote(noteId) {
      const noteRes = this.notes.find(note => noteId === note.id)
      noteRes.isPinned = !noteRes.isPinned
      noteService.save(noteRes)
    }
  },

  computed: {
    filteredNotes() {
      const byName = new RegExp(this.filterBy.txt, "i");
      return this.notes.filter(
        (note) =>
          note.type.includes(this.filterBy.noteType) &&
          byName.test(note.info.txt)
      );

    },
    pinnedNotes() {
      return this.notes.filter(note => note.isPinned)
    },
    otherNotes() {
      return this.notes.filter(note => !note.isPinned)
    }
  },

  components: {
    AppHeader,
    NoteList,
    PinnedNote,
    SideBar
  },
};
