import EmailPreview from './MailPreview.js'
import { emailService } from '../services/mail.service.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">
                    <EmailPreview :email="email"/>
                    <!-- <h2>guy</h2> -->
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