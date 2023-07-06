import { noteService } from "../services/note.service.js";

import {
  showSuccessMsg,
  showErrorMsg,
  eventBus,
} from "../../../services/event-bus.service.js";

import NoteList from "../cmps/NoteList.js";
import AppHeader from "../cmps/AppHeader.js";
import PinnedNote from "../cmps/PinnedNote.js";
import { storageService } from "../../../services/async-storage.service.js";


export default {
  template: `
          <AppHeader
          @filter="setFilterBy"
           />
          <form @submit.prevent="saveNote" class="add-note">
          <input id="user-input" v-model="noteToEdit.info.txt" type="text" placeholder="Take a note...">
           <button>Save</button>

            <select v-model="noteType" >
              <option>NoteTxt</option>
              <option>NoteImg</option>
              <option>NoteTodos</option>
              <option>NoteVideo</option>
            </select>
       </form>
      <!-- <PinnedNote 
        :pinnedNotes="pinnedNotes"
      /> -->

       <NoteList
       @openColor="openColor"
       v-if="notes"
       :notes="pinnedNotes" 
       @remove="removeNote"  
       @setColor="setBgColor" 
       @duplicate="duplicateNote" 
       @pin="pinNote" 
       />

       <NoteList
       @openColor="openColor"
       v-if="notes"
       :notes="otherNotes" 
       @remove="removeNote"  
       @setColor="setBgColor" 
       @duplicate="duplicateNote" 
       @pin="pinNote" 
       />

       <button @click="check" ></button>

       <NoteColor :note ="selectedNote" />
       
    `,
  created() {
    this.loadNotes(),
      this.loadPinnedNotes()
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
    };
  },

  methods: {
    loadNotes() {
      noteService.query()
        .then((notes) => {
          this.notes = notes;
        });
    },

    check() {
      console.log('pinned', this.pinnedNotes);
      console.log('this.notes', this.notes)
    },

    loadPinnedNotes() {
      noteService.query()
        .then((notes) => {
          const pinnedNotes = notes.filter(note => note.isPinned === true);
          this.pinnedNotes = pinnedNotes;
        });
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

    setFilterBy(filterBy) {
      this.filterBy.txt = filterBy.txt;
      this.filterBy.noteType = filterBy.noteType;
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
    PinnedNote
  },
};
