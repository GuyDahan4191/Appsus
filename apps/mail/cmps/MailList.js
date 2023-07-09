import EmailPreview from './MailPreview.js'
import { emailService } from '../services/mail.service.js'

export default {
    name: 'EmailList',
    props: ['emails'],

    template: `
        <section class="email-list">
            <ul>
                <li
                    v-for="email in emails" 
                    :key="email.id" 
                    :to="'/mail/' + email.id"
                    @click="onOpenEmail(email.id)"
                    class="email-preview-info"
                    :class="{'read-email': email.isRead,
                        'unread-email': !email.isRead}"
                >
                    <div class="line-boxes">
                        <input 
                            @click.stop="onSelectEmail(email)" type="checkbox"
                            class="line-checkbox"
                            v-model="email.isSelected"
                            :class="{'is-selected': email.selected,
                                    'not-selected': !email.selected}">
                        
                        <span 
                            @click.stop="onStar(email.id)" 
                            class="star material-symbols-outlined"
                            :class="{'star-true': email.isStar,
                                    'star-false': !email.isStar}"
                        >star</span>
                    </div>
                    
                    <div>
                        <EmailPreview :email="email"/>
                    </div>

                    <section class="actions">
                        <span 
                            @click.stop="onRemoveEmail(email.id)" 
                            title="Remove" 
                            class="btn material-symbols-outlined"
                        >delete</span>
                        
                        <span 
                            @click.stop="onToggleRead(email.id)" 
                            title="Mark as read" 
                            class="btn material-symbols-outlined"
                            v-show="email.isRead"
                        >drafts</span>

                        <span 
                            @click.stop="onToggleRead(email.id)" 
                            title="Mark as unread" 
                            class="btn material-symbols-outlined"
                            v-show="!email.isRead"
                        >mail</span>
                    </section>
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
            // console.log('on open email in list')
            this.$emit('openEmail', emailId)
        },

        onStar(emailId) {
            // console.log('on star in list')
            this.$emit('star', emailId)
        },

        onRemoveEmail(emailId) {
            // console.log('on remove in List')
            this.$emit('remove', emailId)
        },

        onToggleRead(emailId) {
            // console.log('on toggle Read in List')
            this.$emit('toggleRead', emailId)
        },

        onSelectEmail(emailId) {
            this.$emit('selectEmail', emailId)
            // need to be done
        },
    },

    components: {
        EmailPreview,
    }
}