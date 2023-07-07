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
    getCountUnread,
}

const EMAIL_KEY = 'emailDB'
var gFilterBy = {
    txt: '',
    folder: 'inbox',
    isRead: false,

}

let gUnreadCount

const loggedinUser = {
    email: 'guy@appsus.com',
    fullname: 'Guy Dahan'
}
let gSortBy = {
    type: 'sentAt',
    order: true
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
                    // case 'starred':
                    //     mails = mails.filter(mail => mail.isStarred === true)
                    //     break
                    case 'sent':
                        emails = emails.filter(email =>
                            (email.from === loggedinUser.email))
                        // && email.sentAt && email.folder !== 'draft'))
                        break
                    case 'trash':
                        emails = emails.filter(email => email.removedAt)
                        break
                    // case 'draft':
                    //     mails = mails.filter(mail => mail.from === loggedinUser.email && mail.status === 'draft')
                    //     break
                }
            }
            // emails.sort((a, b) => {
            //     if (gSortBy.type === 'sentAt') {
            //         if (a[gSortBy.type] < b[gSortBy.type]) return gSortBy.order ? 1 : -1
            //         if (a[gSortBy.type] > b[gSortBy.type]) return gSortBy.order ? -1 : 1
            //     } else {
            //         if (a[gSortBy.type] < b[gSortBy.type]) return gSortBy.order ? -1 : 1
            //         if (a[gSortBy.type] > b[gSortBy.type]) return gSortBy.order ? 1 : -1
            //     }
            //     return 0
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
    return get(id)
        .then(email => {
            console.log('star before:', email.isStar)
            email.isStar = !email.isStar
            console.log('star after:', email.isStar)
            return put(email)
        })
}

function getCountUnread() {
    // return query({ menu: 'inbox', txt: '' })
    //     .then(emails => emails.filter(email => email.isRead === 'false').length)
    return gUnreadCount
}

function _createEmails() {
    let emails = utilService.load(EMAIL_KEY) || []
    if (!emails || !emails.length) {
        const emails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: '11Would love to catch up sometimes',
                isRead: false,
                isStar: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: 'e102',
                subject: 'Hate you!',
                body: '22Would love to catch up sometimes',
                isRead: true,
                isStar: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'jojo@jojo.com',
                to: 'guy@appsus.com',
                folder: 'inbox'
            },
            {
                id: 'e103',
                subject: 'Love you!',
                body: '33Would love to catch up sometimes',
                isRead: false,
                isStar: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'koko@koko.com',
                to: 'guy@appsus.com',
                folder: 'trash'
            },
            {
                id: 'e104',
                subject: 'I want to sleep!',
                body: 'I f*****g hate all of this bugs',
                isRead: false,
                isStar: false,
                sentAt: Date.now(),
                removedAt: null,
                from: 'guy@appsus.com',
                to: 'shay@zigdon.com',
                folder: 'sent'
            }
        ]
        utilService.save(EMAIL_KEY, emails);
    }
}
