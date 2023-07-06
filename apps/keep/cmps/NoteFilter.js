export default {
  template: `
              <input 
                 class="search"
                  v-model="filterBy.txt" 
                  @input="onSetFilterBy"
                  type="text" 
                  placeholder="Search By Name">  
                  <span class="material-symbols-outlined">search</span> 

              
                <input  @change="onSetFilterBy" type="radio" value="NoteTxt" v-model="filterBy.noteType"> Text
                <input  @change="onSetFilterBy" type="radio" value="NoteImg" v-model="filterBy.noteType"> Image
                <input  @change="onSetFilterBy" type="radio" value="NoteTodos" v-model="filterBy.noteType"> Todos
                <input  @change="onSetFilterBy" type="radio" value="NoteVideo" v-model="filterBy.noteType"> Video
                
            <!-- <select 
            v-model="filterBy.noteType"
            @change="onSetFilterBy"
             >
              <option value="">All</option>
              <option value="NoteTxt">Text</option>
              <option value="NoteImg">Image</option>
              <option value="NoteTodos">Todos</option>
              <option value="NoteVideo">Video</option>
            </select> -->
            
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
