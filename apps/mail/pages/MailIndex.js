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
                v-if="$route.name !== 'EmailDetails'"
                :emails="filteredEmails" 
                @remove="removeEmail"
                @openEmail="openEmail"/>
            
        </section>
    `,

    data() {
        return {
            emails: [],
            filterBy: {
                menu: 'inbox',
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
            filteredEmails = filteredEmails.filter(email => regex.test(email.subject) || regex.test(email.body) || regex.test(email.from))
            return filteredEmails
        },
    },

    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
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

        openEmail(emailId) {
            // emailService.get(emailId)
            //     .then(email => {
            //         if (!email.isRead) {
            //             email.isRead = true
            //             console.log('after open email:', email)
            //             return emailService.save(email)
            //         }
            //     })
            //     // console.log('open Email (read) in index')
            //     .then(savedEmail => {
            //         console.log('savedEmail', savedEmail)
            //         showSuccessMsg('Email marked as Read')
            //     })
            //     .catch(err => {
            //         // showErrorMsg('Cannot mark email as read')
            //     })
            // },

            const email = this.emails.find(email => email.id === emailId)
            email.isRead = true

            console.log('emailId:', emailId)
            // console.log('email:', email)
            // console.log('this.emails:', this.emails)

            emailService.save(email)
                .then(email => this.email = email)
            console.log('email after save:', email)
            this.$router.push({ component: 'MailDetails', params: { emailId } })
            console.log('emailId:', emailId)
        },

        toggleRead() {
            console.log('Read')
            this.$emit('toggleRead', this.email.id)
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
