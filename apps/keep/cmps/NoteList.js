import NotePreview from "../cmps/NotePreview.js";

export default {
  props: ["notes"],
  template: `

   <section class="note-list">
       <ul >
         <li 
          v-for="note in notes" :key="note.id"
          :style="{'background-color':note.style.backgroundColor}">
           <NotePreview :note="note"
            @remove="$emit('remove', $event)"
            @setColor="setBgColor" 
            @duplicate="$emit('duplicate', $event)"
            @pin="$emit('pin', $event)"
            />
         </li>
       </ul>
   </section>
    `,
  data() {
    return {
      selectedNote: null,
    }
  },
  methods: {
    setBgColor(color, noteId) {
      this.$emit("setColor", color, noteId);
    },
  },

  components: {
    NotePreview,
  },
};
