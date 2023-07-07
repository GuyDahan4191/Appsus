export default {
    props: ['emails'],
    template: `

        <section class="email-menu">
            <ul>
                <li class="line-in-menu" @click="onSelectFilter">
                    <span class="material-symbols-outlined">
                    inbox
                    </span class="menu-ops"> Inbox <span> ({{unreadCount}})</span>
                </li>
                
                <li class="line-in-menu" @click="onSelectFilter">
                    <span class="material-symbols-outlined">
                    star
                    </span>Starred <span></span></li>
                <li class="line-in-menu" @click="onSelectFilter">
                    <span class="material-symbols-outlined">
                    send
                    </span>Sent <span></span></li>
                <li class="line-in-menu" @click="onSelectFilter">
                    <span class="material-symbols-outlined">
                    draft
                    </span>Draft <span></span></li>
                <li class="line-in-menu" @click="onSelectFilter">
                    <span class="material-symbols-outlined">
                    delete
                    </span>Trash <span></span></li>
            </ul>
        </section>
    `,

    computed: {
        unreadCount() {
            if (!this.emails) return 0
            return this.emails.filter(email => !email.isRead).length
        },
    },

    methods: {
        onSelectFilter(filter) {
            this.$emit('filter', filter)
            this.$router.push('/mail')
        },
    },
}
