import EmailPreview from './MailPreview.js'
import { emailService } from '../services/mail.service.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul>
                <li v-for="email in emails">
                    <EmailPreview :email="email"/>
                </li>
            </ul>
        </section>
    `,
    methods: {

    },
    components: {
        EmailPreview,
    }
}