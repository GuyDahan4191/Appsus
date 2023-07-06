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
                        <span class="btn" @click="onRemoveEmail(email.id)" title="Remove" class="material-symbols-outlined">
                            delete
                        </span>
                        
                        <span class="btn" @click="onToggleRead" title="Mark as read/unread" class="material-symbols-outlined">
                        drafts
                        </span>
                    </div>
                </li>
            </ul>
        </section>
    `,

    data() {
        return {
            isListShown: true
        }
    },

    // data() {
    //     return {
    //         isListShown = true        
    //         // emails: []
    //     }
    // },

    // watch: {
    //     emails: {
    //         immediate: true,
    //     },
    // },

    created() {
        // emailService.query()
        //     .then(emails => {
        //         this.emails = emails
        //     })
    },

    methods: {
        onOpenEmail(emailId) {
            console.log('open Email (read) in list')
            this.$emit('openEmail', emailId)
            this.isListShown = false
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
        },
    },

    components: {
        EmailPreview,
    }
}