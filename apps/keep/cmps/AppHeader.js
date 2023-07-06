import NoteFilter from "../cmps/NoteFilter.js";

export default {
  template: `
        <header class="app-header">
            <div className="logo-container">
                <span class="material-symbols-outlined">menu</span>
                <h1 class="logo">AppSus</h1>
            </div>
            
            <div className="search-container">
           <NoteFilter
           @filter="$emit('filter', $event)"
           />
           </div>

            <div className="actions-container">
            <span class="material-symbols-outlined">refresh</span>
            <span class="material-symbols-outlined">view_agenda</span>
            <span class="material-symbols-outlined">settings</span>
            <span class="material-symbols-outlined">apps</span>
            <span class="material-symbols-outlined">account_circle</span>

            </div>
            <!-- <nav> -->
                <!-- <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link>|
                <RouterLink to="/keep">Keep</RouterLink> |
                <RouterLink to="/mail">Mail</RouterLink> | -->
            <!-- </nav> -->
        </header>
    `,
  components: {
    NoteFilter,
  },
};
