import { noteService } from "../services/note.service.js";

import {
  showSuccessMsg,
  showErrorMsg,
  eventBus,
} from "../../../services/event-bus.service.js";

import NoteList from "../cmps/NoteList.js";

export default {
  template: `
       <form @submit.prevent="saveNote" class="add-note">
          <input id="user-input" v-model="noteToEdit.info.txt" type="text" placeholder="Enter note">
           <button>Save</button>
       </form>

       <NoteList
       v-if="notes"
       :notes="notes" 
       @remove="removeNote"  
       />

    `,
  created() {
    noteService.query().then((notes) => {
      this.notes = notes;
    });
  },

  data() {
    return {
      notes: [],
      noteToEdit: noteService.getEmptyNote(),
      selectedNote: null
    };
  },

  methods: {
    removeNote(noteId) {
      noteService.remove(noteId).then(() => {
        const noteIdx = this.notes.findIndex((note) => note.id === noteId);
        this.notes.splice(noteIdx, 1);
        showSuccessMsg("Note Removed!");
      });
    },
    
    saveNote() {
      noteService.save(this.noteToEdit).then((savedNote) => {
        showSuccessMsg("Note added!");
        this.notes.push(savedNote);
      });
    },
  },

  components: {
    NoteList,
  },
};
