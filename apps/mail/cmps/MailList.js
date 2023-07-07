import EmailPreview from './MailPreview.js'
import { emailService } from '../services/mail.service.js'

export default {
    name: 'EmailList',
    props: ['emails'],
    // emit: ['isListShown'],

    template: `
        <section class="email-list">
            <ul>
                <!-- <li v-for="email in emails" :key="email.id" v-if="isListShown"> -->
                <li v-for="email in emails" :key="email.id">
                        <EmailPreview 
                            :email="email"
                            @click="onOpenEmail(email.id)"
                        />
                    
                    <div class="actions">
                        <span @click="onRemoveEmail(email.id)" title="Remove" class="btn material-symbols-outlined">
                            delete
                        </span>
                        
                        <span @click="onToggleRead(email.id)" title="Mark as read/unread" class="btn material-symbols-outlined">
                            drafts
                        </span>
                    </div>
                </li>
            </ul>
        </section>
    `,

    data() {
        return {
        }
    },

    methods: {
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

        onToggleRead(emailId) {
            console.log('toggle Read')
            this.$emit('toggleRead', emailId)
        },
    },

    components: {
        EmailPreview,
    }
}