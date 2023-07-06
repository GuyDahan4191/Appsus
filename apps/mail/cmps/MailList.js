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
                            @click="onOpenEmail(email.id)"
                        />
                    
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
            // emails: []
        }
    },

    watch: {
        emails: {
            immediate: true,
            handler(emailList) { },
        },
    },

    created() {
        // emailService.query()
        //     .then(emails => {
        //         this.emails = emails
        //     })
    },

    methods: {
        // onOpenEmail() {
        //     console.log('open Email (read) in list')
        //     this.$emit('open', this.email)
        // },
        onOpenEmail(emailId) {
            console.log('open Email (read) in list')
            this.$emit('openEmail', emailId)
        },

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