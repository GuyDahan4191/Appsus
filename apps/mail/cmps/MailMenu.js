export default {
    props: ['emails'],
    template: `

        <section class="email-menu">
            <ul>
                <li class="line-in-menu inbox" @click="onSetFilter('inbox')">
                    <span class="material-symbols-outlined">
                    inbox
                    </span>Inbox <span> ({{unreadCount}})</span>
                </li>
                <li class="line-in-menu starred" @click="onSetFilter('starred')">
                    <span class="material-symbols-outlined">
                    star
                    </span>Starred <span></span>
                </li>
                <li class="line-in-menu sent" @click="onSetFilter('sent')">
                    <span class="material-symbols-outlined">
                    send
                    </span>Sent <span></span>
                </li>
                <li class="line-in-menu draft" @click="onSetFilter('draft')">
                    <span class="material-symbols-outlined">
                    draft
                    </span>Draft <span> </span>
                </li>
                <li class="line-in-menu trash" @click="onSetFilter('trash')">
                    <span class="material-symbols-outlined">
                    delete
                    </span>Trash <span></span>
                </li>
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
        onSetFilter(filter) {
            console.log('filter:', filter)
            this.$emit('filterByMenu', filter)
            this.$router.push('/mail')
        },
    },
}
