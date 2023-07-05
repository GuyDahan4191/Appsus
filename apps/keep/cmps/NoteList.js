import NotePreview from "../cmps/NotePreview.js";

export default {
  props:['notes'],
  template: `

<section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                  <section class="actions">
                          <button @click="onRemoveNote(note.id)">x</button>
                          <button> 1</button>
                          <button> 2</button>
                          <button> 3</button>
                          <button> 4</button>
                  </section>
                <NotePreview :note="note" />
                </li>
            </ul>
        </section>
    `,
    methods: {
      onRemoveNote(noteId) {
        this.$emit("remove", noteId);
      },
    },
  components: {
    NotePreview,
  },
};
