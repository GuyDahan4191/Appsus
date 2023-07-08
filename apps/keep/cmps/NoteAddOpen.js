export default {
    props: ['type'],
    template: `
      <div v-if="type==='NoteTxt'" className="note-conteiner">
        <div className="note">
          <div className="user-text">
            <h2 contenteditable ref="txt" @input="onSetTxt">Take a Note...</h2>
          </div>
          <h5 @click="saveNoteTxt">Close</h5>
        </div>
      </div>
  
      <div v-if="type==='NoteImg'" className="note-conteiner">
        <div className="note">
          <div className="user-text">
            <h2 contenteditable ref="img" @input="onSetImg">Enter Url</h2>
          </div>
          <h5 @click="saveNoteImg">Close</h5>
        </div>
      </div>
    `,
    data() {
      return {
        TxtNoteInput: "",
        imgNoteInput: "",
      }
    },
    methods: {
      onSetTxt() {
        this.TxtNoteInput = this.$refs.txt.textContent;
      },
      saveNoteTxt() {
        this.$emit('saveNoteTxt', this.TxtNoteInput)
      },
      onSetImg() {
        this.imgNoteInput = this.$refs.img.textContent;
      },
      saveNoteImg() {
        this.$emit('saveNoteImg', this.imgNoteInput)
      }
    }
  };
  