export default {
  template: `
          <section class="book-filter">
              <input 
                  v-model="filterBy.txt" 
                  @input="onSetFilterBy"
                  type="text" 
                  placeholder="Search By Name">   
                
            <select 
            v-model="filterBy.noteType"
            @change="onSetFilterBy"
             >
              <option value="">All</option>
              <option value="NoteTxt">Text</option>
              <option value="NoteImg">Image</option>
              <option value="NoteTodos">Todos</option>
              <option value="NoteVideo">Video</option>
            </select>
            
          </section>
      `,
  data() {
    return {
      filterBy: {
        txt: "",
        noteType: "",
      },
    };
  },
  methods: {
    onSetFilterBy() {
      this.$emit("filter", this.filterBy);
    },
  },
};
