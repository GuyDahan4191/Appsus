import { emailService } from '../services/mail.service.js'
import EmailList from '../cmps/MailList.js'
import EmailFilter from '../cmps/MailFilter.js'

export default {
    template: `
        <section class="email-index">
            <h2>Mails</h2>
            <EmailFilter @filter="setFilterBy"/>
            <!-- :emails="filteredEmails" -->
            <EmailList
                :emails="emails" 
                v-if="emails" 
                @remove="removeEmail"/>
            
        </section>
    `,

    data() {
        return {
            emails: null,
        }
    },

    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
                console.log('emails:', emails)
            })

    },

    components: {
        EmailList,
        EmailFilter,
    },

    methods: {
        romoveEmail(emailId) {
            emailService.handleRemove(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    this.email.splice(idx, 1)
                    showSuccessMsg('email removed')
                })
                .catch(err => {
                    console.log('err:', err)
                    showErrorMsg('Cannot remove email')
                })
        },

        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
}
