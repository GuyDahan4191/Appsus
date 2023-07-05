import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const emailService = {
    query,
    save,
}

const EMAIL_KEY = 'emailDB'

const loggedinUser = {
    email: 'guy@appsus.com',
    fullname: 'Guy Dahan'
}

_createEmails()

function query() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            // console.log('emails', emails)
            return emails
        })
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
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
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                subject: 'Hate you!',
                body: '22Would love to catch up sometimes',
                isRead: true,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'jojo@jojo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'Love you!',
                body: '33Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'koko@koko.com',
                to: 'user@appsus.com'
            }
        ]
        utilService.save(EMAIL_KEY, emails);
    }
}
