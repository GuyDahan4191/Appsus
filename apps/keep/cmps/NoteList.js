import NotePreview from "../cmps/NotePreview.js";

export default {
  props: ["notes"],
  template: `

<section class="note-list">
 <ul>
   <li v-for="note in notes" :key="note.id">
     
     <section class="actions">
       <button @click="onRemoveNote(note.id)">X</button>|
      </section>
     <NotePreview :note="note" />
   </li>
 </ul>
        </section>
    `,
    data() {
      return {
        colorOpen: false
      }
    },

  methods: {
    onRemoveNote(noteId) {
      this.$emit("remove", noteId);
    },
  },
  components: {
    NotePreview,
  },
};
