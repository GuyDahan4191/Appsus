export default {
    props: ['emails'],
    template: `

        <section class="email-menu">
            <button class="new-email">Compose</button>
            <ul>
                <li class="inbox" @click="onSelectFilter">
                    <RouterLink to="/mail/inbox">
                        <div class="inbox-container" >
                            Inbox
                            <!-- <span>{{ unreadCount }}</span> -->
                        </div>
                    </RouterLink>
                </li>
                
                <li>Starred <span></span></li>
                <li>Sent <span></span></li>
                <li>Draft <span></span></li>
                <li>Trash <span></span></li>
            </ul>
        </section>
    `,

    computed: {
        unreadCount() {
            // console.log('unreadCount:', this.emails.filter(email => !email.isRead).length)
            return this.emails.filter(email => !email.isRead).length
        },
    },

    methods: {
        onSelectFilter(filter) {
            this.$emit('filter', filter)
        }
    }
}