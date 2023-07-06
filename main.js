const { createApp } = Vue

import { router } from './routes.js'


import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'

const options = {
	template: `
        <section>
            <RouterView />
            <AppFooter />
            <UserMsg />
        </section>
    `,
	components: {
		AppFooter,
		UserMsg,
	},
}

const app = createApp(options)
app.use(router)
app.mount('#app')
