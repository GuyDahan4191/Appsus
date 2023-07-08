export default {
  props: ['type'],
  template: `
    <div>
      <div v-if="isNoteTypeValid" class="note-conteiner">
        <div class="note">
          <div class="title">
            <input type="text" placeholder="Title" class="title-holder" v-model="userInput.userTitle" />
          </div>
          <div class="text">
            <input type="text" :placeholder="getPlaceholderText(type)" class="title-holder" v-model="userInput.userTxt" />
          </div>
          <div class="buttons">
            <h2></h2>
            <h5 @click="saveNote">Close</h5>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      userInput: {
        userTitle: "",
        userTxt: "",
      }
    };
  },
  computed: {
    isNoteTypeValid() {
      return ['NoteTxt', 'NoteImg', 'NoteVideo', 'NoteTodos'].includes(this.type);
    }
  },
  methods: {
    saveNote() {
      if (this.type === 'NoteTodos') {
        const todoItems = this.userInput.userTxt
          .split(',')
          .map(item => item.trim())
          .map(txt => ({ txt, doneAt: null }));
        this.userInput.userTxt = todoItems;
      }
      this.$emit('save', this.userInput, this.type);
    },

    getPlaceholderText(noteType) {
      if (noteType === 'NoteTxt') {
        return 'Take a note...';
      } else if (noteType === 'NoteImg') {
        return 'Enter URL...';
      } else if (noteType === 'NoteVideo') {
        return 'Enter video URL...';
      } else if (noteType === 'NoteTodos') {
        return 'Enter your to-do items by (,)...';
      }
    }
  },
};
