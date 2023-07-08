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
import NoteAdd from "../cmps/NoteAdd.js";
import NoteAddOpen from "../cmps/NoteAddOpen.js";
import NoteDetails from "../cmps/NoteDetails.js";


export default {
  template: `
  <div 
  :class="{'edit-note-open': isEditNoteOpen}"
   > 
          <AppHeader
          @filterByTxt="setFilterByTxt"
           />

           <div className="side-bar-conteiner">
           <SideBar 
           @filterByType="setFilterByType"
           />
           
           
           <div className="main-content">

           <NoteAdd 
           @setNoteType="openAddNoteByType"
            v-if="!isAddNoteOpen" />

            <NoteAddOpen
             v-if="isAddNoteOpen"
             :type="noteTypeToEdit" 
             @save="saveNote"
             />
             
             <NoteDetails
              v-if="isEditNoteOpen"
              :note="noteToEdit"
              @save="saveEditNote"
              />
     
       <h2
       v-if="isFilterMode"
       >Search</h2>

       <!-- filtered-->
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
       @editNote="openNoteEdit"
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
       @editNote="openNoteEdit"
       />

       

       <NoteColor :note ="selectedNote" />

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

      noteToAdd: noteService.getEmptyNote(),
      selectedNote: null,
      isFilterMode: false,

      noteTypeToEdit: "",
      isAddNoteOpen: false,

      isEditNoteOpen: false,
      noteToEdit: "",
      noteEdited: null,
      noteEditedIdx: null

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

    openAddNoteByType(type) {
      this.noteTypeToEdit = type
      this.isAddNoteOpen = true
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

    saveNote(userInput, type) {
      this.isAddNoteOpen = false
      if (!userInput.userTxt) return
      this.noteToAdd.type = type

      this.noteToAdd.info.txt = userInput.userTxt
      this.noteToAdd.info.title = userInput.userTitle
      this.noteToAdd.info.url = userInput.userTxt

      noteService.save(this.noteToAdd)
        .then((savedNote) => {
          this.notes.push(savedNote);
          this.noteToAdd = noteService.getEmptyNote();
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
    },

    openNoteEdit(noteId) {
      this.noteToEdit = this.notes.find((note => note.id === noteId))
      console.log(this.noteToEdit);

      this.noteEditedIdx = this.notes.findIndex((note => note.id === noteId))
      this.noteEdited = this.notes.splice(this.noteEditedIdx, 1)

      this.isEditNoteOpen = true
    },

    saveEditNote(userInput, noteId) {
      this.isEditNoteOpen = false

      const editedNoteIdx = this.noteEditedIdx
      const rawInfo = Vue.toRaw(this.noteEdited[0].info)

      rawInfo.title = userInput.title;
      rawInfo.txt = userInput.txt;
      rawInfo.url = userInput.url;

      this.notes.splice(editedNoteIdx, 0, this.noteEdited[0])

      noteService.save(this.noteEdited[0])
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
    SideBar,
    NoteAdd,
    NoteAddOpen,
    NoteDetails
  },
};
