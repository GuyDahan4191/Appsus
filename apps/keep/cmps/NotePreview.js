import NoteTodos from "../cmps/NotTodos.js";
import NoteImg from "../cmps/NoteImg.js";
import NoteVideo from "../cmps/NoteVideo.js";
import NoteTxt from "../cmps/NoteTxt.js";

export default {
  props: ["note"],
  template: `
   <Component
         :is="note.type"
         :info="note.info"
         @click="setNoteToEdit(note.id)"
         />

         <div className="active">
         <span class="material-symbols-outlined">check_circle</span>
         </div>
  <section class="action-btn">
          <button @click="onRemoveNote(note.id)">
        <span class="material-symbols-outlined">delete</span>
          </button>

       <button @click="this.isColorOpen = !this.isColorOpen">
        <span class="material-symbols-outlined">palette</span>
      </button>
      
       <button @click="duplicateNote(note.id)" >
          <span class="material-symbols-outlined">file_copy</span>
       </button>

       <button @click="pinNote(note.id)" >
          <span class="material-symbols-outlined">push_pin</span>
       </button>
  </section>

    <section v-if="isColorOpen" class="color-pallte">
  <div v-for="(color, index) in colorOptions" :key="index" @click="setBgColor(color, note.id)" :class="colorClass[index]"></div>
</section>

    `,
    
  data() {
    return {
      isColorOpen: false,
      colorPick: "",
      colorOptions: [
        "#ff7070", // red
        "#7676ff", // blue
        "#79ff79", // green
        "#ffff78", // yellow
        "#ff728a", // pink
        "#cc79ff", // purple
        "#ffffff", // white
        "#ffc472", // orange
      ],
      colorClass: [
        "red",
        "blue",
        "green",
        "yellow",
        "pink",
        "purple",
        "white",
        "orange"
      ]
    }
  },

  methods: {
    onRemoveNote(noteId) {
      this.$emit("remove", noteId)
    },

    pinNote(noteId) {
      this.$emit("pin", noteId)
    },

    setBgColor(color, noteId) {
      this.$emit("setColor", color, noteId)
    },

    duplicateNote(noteId) {
      this.$emit("duplicate", noteId);
    },
    setNoteToEdit(noteId) {
      console.log(noteId);
      this.$emit('editNote', noteId)
    }


  },
  components: {
    NoteTodos,
    NoteImg,
    NoteVideo,
    NoteTxt,
  },
};
