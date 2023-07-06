import { emailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import EmailList from '../cmps/MailList.js'
import EmailFilter from '../cmps/MailFilter.js'
import EmailMenu from '../cmps/MailMenu.js'
import ComposeMail from '../cmps/ComposeMail.js'

export default {
    name: 'EmailIndex',
    props: ['email'],
    template: `
        <section class="email-index">
            <button class="new-email" @click="toggleCompose"><span class="material-symbols-outlined">
                edit
                </span>Compose</button>

            <EmailFilter @filter="setFilterBy"/>
            <EmailMenu @filterByMenu="onFilterByMenu" :emails="emails"/>
            <EmailList
                v-if="emails"
                :emails="filteredEmails" 
                @remove="removeEmail"
                @openEmail="openEmail"
                />
            <ComposeMail @send="send" v-if="isCompose"/>
            <RouterView :emails="emails"/>
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
            isCompose: false,
        }
    },

    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
            })
    },

    computed: {
        filteredEmails() {
            let filteredEmails = this.emails
            const regex = new RegExp(this.filterBy.txt, 'i')
            filteredEmails = filteredEmails.filter(email => regex.test(email.subject) || regex.test(email.body) || regex.test(email.from))
            return filteredEmails
        },
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
            emailService.get(emailId)
                .then(email => {
                    if (!email.isRead) {
                        email.isRead = true
                        console.log('after open email:', email)
                        return emailService.save(email)
                    }
                })
                // console.log('open Email (read) in index')
                //     .then(savedEmail => {
                //         console.log('savedEmail', savedEmail)
                //         showSuccessMsg('Email marked as Read')
                //     })
                .catch(err => {
                    showErrorMsg('Cannot mark email as read')
                })
        },

        onFilterByMenu(filter) {
            emailService.setFilterBy({ status: filter })
            this.getEmails()
        },

        getEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },

        toggleRead() {
            console.log('Read')
            this.$emit('toggleRead', this.email.id)
        },

        setFilterBy(filterBy) {
            this.filterBy.txt = filterBy.txt
            console.log('filterBy.txt:', this.filterBy.txt)
        },

        send(sendEmail) {
            const email = {
                id: '',
                subject: sendEmail.subject,
                body: sendEmail.body,
                isRead: false,
                isStarred: false,
                sentAt: Date.now(),
                removedAt: null,
                from: 'guy@appsus.com',
                to: sendEmail.to
            }
            emailService.save(email)
                .then(savedmail => this.emails.push(savedmail))
            this.showCompose = false
            showSuccessMsg('mail sent')
        },

        toggleCompose() {
            console.log('new messege:')
            this.isCompose = !this.isCompose
        },
    },

    components: {
        EmailList,
        EmailFilter,
        EmailMenu,
        ComposeMail,
    },
}
