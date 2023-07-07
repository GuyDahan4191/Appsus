export default {
  template: `
              <input 
                 class="search"
                  v-model="filterBy" 
                  @input="onSetFilterBy"
                  type="text" 
                  placeholder="Search By Name">  
                  <span class="material-symbols-outlined">search</span> 

              
                <!-- <input  @change="onSetFilterBy" type="radio" value="NoteTxt" v-model="filterBy.noteType"> Text
                <input  @change="onSetFilterBy" type="radio" value="NoteImg" v-model="filterBy.noteType"> Image
                <input  @change="onSetFilterBy" type="radio" value="NoteTodos" v-model="filterBy.noteType"> Todos
                <input  @change="onSetFilterBy" type="radio" value="NoteVideo" v-model="filterBy.noteType"> Video -->
          
            
      `,
  data() {
    return {
      filterBy:""
    };
  },
  methods: {
    onSetFilterBy() {
      this.$emit("filterByTxt", this.filterBy);
    },
  },
};
