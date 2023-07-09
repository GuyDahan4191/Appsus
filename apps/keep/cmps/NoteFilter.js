export default {
  template: `
           <div className="search-container">
              <input 
                 class="search"
                  v-model="filterBy" 
                  @input="onSetFilterBy"
                  type="text" 
                  placeholder="Search By Name">  
                  <span class="material-symbols-outlined">search</span>          
           </div>

            
      `,
  data() {
    return {
      filterBy: ""
    };
  },
  methods: {
    onSetFilterBy() {
      this.$emit("filterByTxt", this.filterBy);
    },
  },
};
