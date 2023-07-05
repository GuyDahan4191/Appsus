import EmailPreview from './MailPreview.js'
import { emailService } from '../services/mail.service.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">

                    <EmailPreview 
                        :email="email"
                        @click="onOpenEmail"/>
                        <div class="actions">
                            <button @click="onRemoveEmail(email.id)" title="Remove">Delete</button>
                            <button @click="onToggleRead" title="Mark as read/unread">Read</button>
                        </div>
                </li>
            </ul>
        </section>
    `,

    data() {
        return {
            mails: []
        }
    },

    created() {
        emailService.query()
            .then(mails => {
                this.mails = mails
            })
    },

    methods: {
        // onOpenEmail() {
        //     console.log('open Email (read) in list')
        //     this.$emit('read', this.email)
        // },

        onToggleStar() {
            console.log('Star')
            this.$emit('star', this.email.id)
        },

        onRemoveEmail(emailId) {
            console.log('Remove in List')
            this.$emit('remove', emailId)
        },

        onToggleRead() {
            console.log('Read')
            this.$emit('toggleRead', this.email.id)
        }
    },

    components: {
        EmailPreview,
    }
}