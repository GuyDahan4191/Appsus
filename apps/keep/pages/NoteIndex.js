import { noteService } from "../services/note.service.js";

import {
  showSuccessMsg,
  showErrorMsg,
  eventBus,
} from "../../../services/event-bus.service.js";

import NoteList from "../cmps/NoteList.js";
import NoteFilter from "../cmps/NoteFilter.js";

export default {
  template: `
       <form @submit.prevent="saveNote" class="add-note">
          <input id="user-input" v-model="noteToEdit.info.txt" type="text" placeholder="Enter note">
           <button>Save</button>

        <div className="filter">
           <NoteFilter
            @filter="setFilterBy"/>
        </div>
          
            <select v-model="noteType" >
              <option>NoteTxt</option>
              <option>NoteImg</option>
              <option>NoteTodos</option>
              <option>NoteVideo</option>
            </select>
       </form>

       <NoteList
       v-if="notes"
       :notes="filteredNotes" 
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
      filterBy: {
        txt: "",
        noteType: "",
      },
      noteToEdit: noteService.getEmptyNote(),
      noteType: "",
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
        this.noteToEdit = noteService.getEmptyNote();
      });
    },
    setFilterBy(filterBy) {
      this.filterBy.txt = filterBy.txt;
      this.filterBy.noteType = filterBy.noteType;
    },
  },
  computed: {
    filteredNotes() {
      const byName = new RegExp(this.filterBy.txt, "i");
      return this.notes.filter(
        (note) =>
          this.filterBy.noteType === note.type && 
          byName.test(note.info.txt)
      );
    },
  },

  components: {
    NoteList,
    NoteFilter,
  },
};
