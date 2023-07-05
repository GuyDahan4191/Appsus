import { noteService } from "../services/note.service.js"

import NoteList from "../cmps/NoteList.js";

export default {
	template: `
       <div className="add-note">
        <input id="user-input" type="text" placeholder="add your note" />
       </div>

       <NoteList
       v-if="notes"
       :notes="notes"   
       />

    `,
     components: {
        NoteList,
      },

      data() {
        return {
            notes: []
        }
      },

      created() {
        noteService.query()
        .then((notes) => {
        //   console.log(notes);
          this.notes = notes
        })
      },
}
