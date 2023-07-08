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
        <!-- <input @click="setNoteType(NoteTxt)" id="user-input" type="text" placeholder="Take a note..."> -->
   <!-- <form @submit.prevent="saveNote" class="add-note">
          <input @change="check" id="user-input" v-model="noteToEdit.info.txt" type="text" placeholder="Take a note...">
           <button>Save</button>

            <select v-model="noteType" >
              <option>NoteTxt</option>
              <option>NoteImg</option>
              <option>NoteTodos</option>
              <option>NoteVideo</option>
            </select>
       </form> -->
    `,
    methods: {
        setNoteType(type) {
            this.$emit('setNoteType', type)
        }
    }
}