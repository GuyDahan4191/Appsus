import { emailService } from '../services/mail.service.js'

export default {
    props: ['emails'],

    template: `
        <div class="bg-color-menu">
            <section class="email-menu">
                <ul>
                    <li class="line-in-menu inbox" @click="onSetFilter('inbox')">
                        <span class="material-symbols-outlined"
                        :class="{ onFolder: folder === 'inbox' }">
                        inbox
                        </span>Inbox <span class="unread-count"> ({{unreadCount}})</span>
                    </li>
                    <li class="line-in-menu starred" @click="onSetFilter('starred')">
                        <span class="material-symbols-outlined"  
                        :class="{ onFolder: folder === 'starred' }">
                        star
                        </span>Starred <span></span>
                    </li>
                    <li class="line-in-menu sent" @click="onSetFilter('sent')">
                        <span class="material-symbols-outlined"
                        :class="{ onFolder: folder === 'sent' }">
                        send
                        </span>Sent <span></span>
                    </li>
                    <li class="line-in-menu draft" @click="onSetFilter('draft')">
                        <span class="material-symbols-outlined"
                        :class="{ onFolder: folder === 'draft' }">
                        draft
                        </span>Draft <span> </span>
                    </li>
                    <li class="line-in-menu trash" @click="onSetFilter('trash')">
                        <span class="material-symbols-outlined"
                        :class="{ onFolder: folder === 'trash' }">
                        delete
                        </span>Trash <span></span>
                    </li>
                </ul>
            </section>
        </div>
    `,
    data() {
        return {
            folder: ''
        }
    },

    computed: {
        unreadCount() {
            // if (!this.emails) return 0
            // console.log('!this.emails:', !this.emails)
            // emailService.query({ folder: 'inbox', txt: '' })
            //     .then(emails => emails.filter
            //         (email => !email.isRead).length))
            if (!this.emails) {
                return 0
            }
            return this.emails.filter(email => !email.isRead).length
        },
    },

    methods: {
        onSetFilter(tab) {
            console.log('tab:', tab)
            this.folder = tab
            this.$emit('filterByMenu', tab)
            this.$router.push({ path: '/mail', query: { tab } })
        },
    },

}
