export default {
    props:['note'],
    template: `
    <div v-if="note.type==='NoteTxt'" className="note-details">
        <div className="edit-note">
            <div className="title">
                <input type="text" class="title-holder" v-model="userEdit.title"/>
            </div>
            
            <div className="text">
                <input type="text" class="title-holder" v-model="userEdit.txt"/>
            </div>
            
            <div class="buttons">
                <h2></h2>
                <h5 @click="saveEditedNote(note.id)">Close</h5>
            </div>
        </div>
    </div>

    <div v-if="note.type==='NoteImg'" className="note-details">
        <div className="edit-note">
            <div className="title">
                <input type="text" class="title-holder" v-model="userEdit.title"/>
            </div>
            
            <div className="text">
                <input type="text" class="title-holder" v-model="userEdit.url"/>
            </div>
            
            <div class="buttons">
                <h2></h2>
                <h5 @click="saveEditedNote(note.id)">Close</h5>
            </div>
        </div>
    </div>

    <div v-if="note.type==='NoteVideo'" className="note-details">
        <div className="edit-note">
            <div className="title">
                <input type="text" class="title-holder" v-model="userEdit.title"/>
            </div>
            
            <div className="text">
                <input type="text" class="title-holder" v-model="userEdit.url"/>
            </div>
            
            <div class="buttons">
                <h2></h2>
                <h5 @click="saveEditedNote(note.id)">Close</h5>
            </div>
        </div>
    </div>

    `,

    data() {
        return {
            userEdit: {
                title: this.note.info.title,
                txt: this.note.info.txt,
                url: this.note.info.url
            },
        }
    },
    methods: {
        saveEditedNote(noteId) {
            this.$emit('save',this.userEdit, noteId)
        }
    },
}