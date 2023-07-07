
export default {
    name: 'EmailPreview',
    props: ['email'],
    template: `
        <RouterLink :to="'/mail/' + email.id">
            <article class="email-preview-container"
                :class="{'unread-email': !email.isRead,
                'read-email': email.isRead}">

                <div class="email-preview-info">
                    <div class="line-boxes">
                        <input type="checkbox" class="line-checkbox">
                        <div @click="onStar" class="star" 
                            :class="{'star-true': email.isStar,
                                'star-false': !email.isStar}">
                            <span class="material-symbols-outlined">star</span>
                        </div>
                    </div>
                    <div class="line-preview">
                        <span class="name">{{email.from}}</span>
                        <div class="subject-body">
                            <span class="subject">{{email.subject}}</span>
                            - 
                            <span class="body">{{email.body}}</span>
                        </div>
                        <span class="sent-at">{{readableTime}}</span>
                    </div>
                </div>
            </article>
        </RouterLink>
    `,

    created() {
    },

    methods: {
        onStar() {
            this.email.isStar = !this.email.isStar
            this.$emit('starred', this.email)
        },
    },

    computed: {
        isRead() {
            console.log('mail is read')
            return { 'read': this.email.isRead === 'read' }
        },

        readableTime() {
            // if not today
            let formation = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
            }
            // if today
            if ((Date.now() - this.email.sentAt) < (24 * 60 * 60 * 1000)) {
                formation = {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            }
            return new Intl.DateTimeFormat('default', formation).format(this.email.sentAt)
        },
    },
}