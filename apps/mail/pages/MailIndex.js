import { emailService } from '../services/mail.service.js'
import EmailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="email-index">
            <h2>Mails</h2>
            <EmailList :emails="emails"/>
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
    }
}
