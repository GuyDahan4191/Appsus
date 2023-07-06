export default {
	template: `
        <header class="app-header">
            <h1 class="logo">AppSus</h1>
            <div className="search-wrapper"></div>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link>|
                <RouterLink to="/keep">Keep</RouterLink> |
                <RouterLink to="/mail">Mail</RouterLink> |
            </nav>
        </header>
    `,
}
