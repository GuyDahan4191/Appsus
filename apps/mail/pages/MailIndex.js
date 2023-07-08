import { emailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import EmailList from '../cmps/MailList.js'
import EmailFilter from '../cmps/MailFilter.js'
import EmailMenu from '../cmps/MailMenu.js'
import ComposeMail from '../cmps/ComposeMail.js'
import AppHeader from "../cmps/MailAppHeader.js";

export default {
    name: 'EmailIndex',
    props: ['email'],
    template: `
        <AppHeader @filterTxt="setFilterBy"/>
        <section class="email-index">
            <button class="new-email" @click="onToggleCompose">
                <span class="material-symbols-outlined">edit
                </span>Compose
            </button>

            <div class="btn-filters">
                <button class="btn-filter" @click="onSetSortBy('date')">filter by date</button>
                <button class="btn-filter" @click="onSetSortBy('subject')">filter by subject</button>
                <button class="btn-filter" @click="onSetSortBy('from')">filter by from</button>
            </div>
                
            <EmailMenu @filterByMenu="onFilterByMenu" :emails="emails"/>
            <EmailList
                v-if="emails"
                :emails="filteredEmails" 
                @remove="removeEmail"
                @openEmail="openEmail"
                @toggleRead="toggleRead"
                @star="onStar"
                />
            <ComposeMail
                v-if="isCompose" 
                @send="onSend"
                @close="close"
                @draftSaved="loadEmails"
                />
            <RouterView :emails="emails" />
        </section>
    `,

    data() {
        return {
            emails: [],
            filterBy: {
                menu: 'inbox',
                txt: '',
                isStared: false,
                // isRead: 'all',
                sortBy: 'date',
                sortDirectaion: true
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

        getBtnUnreadClass() {
            return this.filteredBy.isUnread ? 'btn-unread-on' : ''
        },
    },

    methods: {
        loadEmails() {
            emailService.query(this.filterBy)
                .then(emails => this.emails = emails)
        },

        removeEmail(emailId) {
            console.log('1:')
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
                .then(this.loadEmails)
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
            console.log('filter in index:', filter)
            emailService.setFilterBy({ folder: filter })
            emailService.query()
                .then(emails => this.emails = emails)
        },

        getEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },

        setFilterBy(filterBy) {
            console.log('filterBY:', filterBy)
            this.filterBy.txt = filterBy.txt
            console.log('filterBy.txt:', this.filterBy.txt)
        },

        onSend(sendEmail) {
            const email = {
                id: utilService.makeId,
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

        close(sendEmail) {
            this.isCompose = !this.isCompose

            const email = {
                folder: draft
            }
        },

        onToggleCompose() {
            console.log('new messege:')
            this.isCompose = !this.isCompose
            // onSend()
        },

        toggleRead(emailId) {
            emailService.get(emailId)
                .then(email => {
                    email.isRead = !email.isRead
                    return emailService.save(email)
                })
                .then(this.loadEmails)
                // console.log('open Email (read) in index')
                //     .then(savedEmail => {
                //         console.log('savedEmail', savedEmail)
                //         showSuccessMsg('Email marked as Read')
                //     })
                .catch(err => {
                    showErrorMsg('Cannot mark email as read')
                })
        },

        onStar(emailId) {
            emailService.toggleStar(emailId)
                .then(() => this.loadEmails())
        },

        onSetSortBy(sortBy) {
            if (this.filterBy.sortBy === sortBy) {
                this.filterBy.sortDirection = !this.filterBy.sortDirection
                console.log('sortDirection:', this.filterBy.sortDirection)
            }
            this.filterBy.sortBy = sortBy
            console.log('sort by index', sortBy)
            this.loadEmails()
        }
    },

    components: {
        EmailList,
        EmailFilter,
        EmailMenu,
        ComposeMail,
        AppHeader,
    },
}
