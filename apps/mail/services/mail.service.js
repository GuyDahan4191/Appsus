import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const emailService = {
    query,
    get,
    put,
    getFilterBy,
    setFilterBy,
    save,
    remove,
    toggleRead,
    toggleStar,
    getUnreadCount,
}

const EMAIL_KEY = 'emailDB'
var gFilterBy = {
    txt: '',
    folder: 'inbox',
    isRead: false,
    sortBy: '',
    sortDirection: 1
}

const loggedinUser = {
    email: 'guy@appsus.com',
    fullname: 'Guy Dahan'
}

_createEmails()

function query() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            // console.log('emails', emails)
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                emails = emails.filter(email => regex.test(email.subject) || regex.test(email.body))
            }
            if (gFilterBy.folder) {
                console.log('gFilterBy.folder:', gFilterBy.folder)
                switch (gFilterBy.folder) {
                    case 'inbox':
                        emails = emails.filter(email =>
                            (email.to === loggedinUser.email) && (!email.removedAt))
                        break
                    case 'starred':
                        emails = emails.filter(email => email.isStar === true)
                        break
                    case 'sent':
                        emails = emails.filter(email =>
                            (email.from === loggedinUser.email))
                        break
                    case 'trash':
                        emails = emails.filter(email => email.removedAt || email.folder === 'trash')
                        break
                    case 'draft':
                        emails = emails.filter(email => email.from === loggedinUser.email && email.folder === 'draft')
                        break
                }
            }
            // console.log('sort', gFilterBy.sortBy)
            // emails.sort((a, b) => {
            //     if (gFilterBy.sortDirection) {
            //         if (a[gFilterBy.sortBy] < b[gFilterBy.sortBy]) return gFilterBy.sortBy ? 1 : -1
            //         if (a[gFilterBy.sortBy] > b[gFilterBy.sortBy]) return gFilterBy.sortBy ? -1 : 1
            //         return 0
            //     }
            //     else {
            //         if (a[gFilterBy.sortBy] > b[gFilterBy.sortBy]) return gFilterBy.sortBy ? 1 : -1
            //         if (a[gFilterBy.sortBy] < b[gFilterBy.sortBy]) return gFilterBy.sortBy ? -1 : 1
            //         return 0
            //     }
            // })
            return emails
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function put(updatedEmail) {
    return storageService.put(EMAIL_KEY, updatedEmail)
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    console.log('1:')
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    console.log('2:')
    if (filterBy.folder !== undefined) gFilterBy.folder = filterBy.folder
    console.log('filterBy.folder:', filterBy.folder)
    // if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function remove(emailId) {
    return get(emailId)
        .then(email => {
            if (email.removedAt) {
                return storageService.remove(EMAIL_KEY, emailId)
            }
            email.removedAt = Date.now()
            email.isStar = false
            put(email)
        })
}

function toggleRead(email) {
    email.isRead = (email.isRead === 'read') ? 'unread' : 'read'
    // update the email in the menu navbar
    return put(email)
}

function toggleStar(emailId) {
    return get(emailId)
        .then(email => {
            // console.log('star before:', email.isStar)
            email.isStar = !email.isStar
            // console.log('star after:', email.isStar)
            return put(email)
        })
}

function getUnreadCount() {
    return query({ folder: 'inbox', txt: '' })
        .then(emails => emails.filter(email => !email.isRead).length)
}

function _createEmails() {
    let emails = utilService.load(EMAIL_KEY) || []
    if (!emails || !emails.length) {
        const emails = [
            {
                id: utilService.makeId(5),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStar: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Hate you!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                isStar: false,
                sentAt: 1551233930594,
                removedAt: null,
                from: 'guy@appsus.com',
                to: 'jojo@jojo.com',
                folder: 'sent'
            },
            {
                id: utilService.makeId(5),
                subject: 'Love you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStar: false,
                sentAt: 1553133930594,
                removedAt: null,
                from: 'koko@koko.com',
                to: 'guy@appsus.com',
                folder: 'trash'
            },
            {
                id: utilService.makeId(5),
                subject: 'Slack account sign in from a new device',
                body: 'Slack account sign in from a new browser.\nIf this was you, you’re all set!\nIf this wasn’t you, please change your password the app. You can also enable two-factor authentication to help secure your account.',
                isRead: true,
                isStar: true,
                sentAt: Date.now(),
                removedAt: null,
                from: 'feedback@slack.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Going to israel',
                body: `Hi,\nI'm way back.\nDo you know how long until we arrive to the land of milk and honey?\nWaiting for an answer,\nJesus`,
                isRead: false,
                isStar: true,
                sentAt: 1851133930594,
                removedAt: null,
                from: 'Jesus@christ.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Wolt (Accepting a purchase on Wolt)',
                imgSrc: 'wolt',
                body: `Toka Pizza Haifa\nJuly 02, 2023, 20:56\nOrder number: 64a1b28edb1ea9c70fe51736\nTotal: ILS 153.00`,
                isRead: false,
                isStar: false,
                sentAt: Date.now() - 1,
                removedAt: null,
                from: 'info@wolt.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Wolt (Accepting a purchase on Wolt)',
                imgSrc: 'wolt',
                body: `Toka Pizza Haifa\nJuly 02, 2023, 20:56\nOrder number: 64a1b28edb1ea9c70fe51736\nTotal: ILS 153.00`,
                isRead: false,
                isStar: false,
                sentAt: Date.now() - 1,
                removedAt: null,
                from: 'info@wolt.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Wolt (Accepting a purchase on Wolt)',
                imgSrc: 'wolt',
                body: `Toka Pizza Haifa\nJuly 02, 2023, 20:56\nOrder number: 64a1b28edb1ea9c70fe51736\nTotal: ILS 153.00`,
                isRead: false,
                isStar: false,
                sentAt: Date.now() - 1,
                removedAt: null,
                from: 'info@wolt.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Wolt (Accepting a purchase on Wolt)',
                imgSrc: 'wolt',
                body: `Toka Pizza Haifa\nJuly 02, 2023, 20:56\nOrder number: 64a1b28edb1ea9c70fe51736\nTotal: ILS 153.00`,
                isRead: false,
                isStar: false,
                sentAt: Date.now() - 1,
                removedAt: null,
                from: 'info@wolt.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Wolt (Accepting a purchase on Wolt)',
                imgSrc: 'wolt',
                body: `Toka Pizza Haifa\nJuly 02, 2023, 20:56\nOrder number: 64a1b28edb1ea9c70fe51736\nTotal: ILS 153.00`,
                isRead: false,
                isStar: false,
                sentAt: Date.now() - 1,
                removedAt: null,
                from: 'info@wolt.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Wolt (Accepting a purchase on Wolt)',
                imgSrc: 'wolt',
                body: `Toka Pizza Haifa\nJuly 02, 2023, 20:56\nOrder number: 64a1b28edb1ea9c70fe51736\nTotal: ILS 153.00`,
                isRead: false,
                isStar: false,
                sentAt: Date.now() - 1,
                removedAt: null,
                from: 'info@wolt.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Wolt (Accepting a purchase on Wolt)',
                imgSrc: 'wolt',
                body: `Toka Pizza Haifa\nJuly 02, 2023, 20:56\nOrder number: 64a1b28edb1ea9c70fe51736\nTotal: ILS 153.00`,
                isRead: false,
                isStar: false,
                sentAt: Date.now() - 1,
                removedAt: null,
                from: 'info@wolt.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: utilService.makeId(5),
                subject: 'Wolt (Accepting a purchase on Wolt)',
                imgSrc: 'wolt',
                body: `Toka Pizza Haifa\nJuly 02, 2023, 20:56\nOrder number: 64a1b28edb1ea9c70fe51736\nTotal: ILS 153.00`,
                isRead: false,
                isStar: false,
                sentAt: Date.now() - 1,
                removedAt: null,
                from: 'info@wolt.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },

        ]


        utilService.save(EMAIL_KEY, emails);
    }
}
