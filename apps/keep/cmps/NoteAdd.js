export default {
    template: `
    <div className="add-note-conteiner">
        <div className="add-note">
            <h2 @click="setNoteType('NoteTxt')" >Take a note...</h2>
              <ul class="type-list">
                 <li @click="setNoteType('NoteTxt')"><span class="material-symbols-outlined">title</span></li>
                 <li @click="setNoteType('NoteImg')"><span class="material-symbols-outlined">image</span></li>
                 <li @click="setNoteType('NoteTodo')"><span class="material-symbols-outlined">check_box</span></li>
                 <li @click="setNoteType('NoteVideo')"><span class="material-symbols-outlined">videocam</span></li>
             </ul>
        </div>
</div>
    `,
    methods: {
        setNoteType(type) {
            this.$emit('setNoteType', type)
        }
    }
}