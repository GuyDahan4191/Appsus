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
         />
         
    <section class="actions">
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
      <!-- <div  v-for="(color, idx) in colorOption"
        key="color"
        @click="setBgColor(color, note.id)"
        :class="colorClass[idx]"
        > -->
        <div @click="setBgColor('#ff7070',note.id)"className="red"></div>
        <div @click="setBgColor('#7676ff',note.id)" className="blue"></div>
        <div @click="setBgColor('#79ff79',note.id)" className="green"></div>
        <div @click="setBgColor('#ffff78',note.id)" className="yellow"></div>
        <div @click="setBgColor('#ff728a',note.id)" className="pink"></div>
        <div @click="setBgColor('#cc79ff',note.id)" className="purple"></div>
        <div @click="setBgColor('#ffffff',note.id)" className="white"></div>
        <div @click="setBgColor('#ffc472',note.id)" className="pink"></div>
      <!-- </div> -->
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
      colorClass:[
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
    }
  },
  components: {
    NoteTodos,
    NoteImg,
    NoteVideo,
    NoteTxt,
  },
};
