import { emailService } from '../services/mail.service.js'
import EmailList from '../cmps/MailList.js'
import EmailFilter from '../cmps/MailFilter.js'
import EmailMenu from '../cmps/MailMenu.js'

export default {
    template: `
        <section class="email-index">

            <EmailFilter @filter="setFilterBy"/>
            <EmailMenu/>
            <EmailList
                v-if="emails" 
                :emails="filteredEmails" 
                @remove="removeEmail"
                @read="openEmail"/>
            
        </section>
    `,

    data() {
        return {
            emails: [],
            filterBy: {
                // menu: 'inbox',
                txt: '',
                // isStared: false,
                // isRead: 'all',
            },
        }
    },

    computed: {
        filteredEmails() {
            let filteredEmails = this.emails
            const regex = new RegExp(this.filterBy.txt, 'i')
            filteredEmails = filteredEmails.filter(email => regex.test(email.subject) || regex.test(email.body))
            return filteredEmails
        }
    },

    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
                console.log('emails:', emails)
            })
    },

    methods: {
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    console.log('Remove in index')
                    this.emails.splice(idx, 1)
                })
                .catch(err => {
                    console.log('err:', err)
                    showErrorMsg('Cannot remove email')
                })
        },

        openEmail(id) {
            emailService.get(id)
                .then(email => {
                    if (email.isRead === 'read') {
                        return email
                    }
                    console.log('open Email (read) in index')
                    return emailService.toggleRead(email)
                        .then(() => email)
                })
        },

        setFilterBy(filterBy) {
            this.filterBy.txt = filterBy.txt
            console.log('filterBy.txt:', this.filterBy.txt)
        },
    },

    components: {
        EmailList,
        EmailFilter,
        EmailMenu,
    },
}
