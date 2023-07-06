
export default {
    name: 'EmailPreview',
    props: ['email'],
    template: `
        <RouterLink :to="'/mail/' + email.id">
            <article class="email-preview-container"
                :class="{'unread-email': !email.isRead,
                'read-email': email.isRead}">


                <!-- @click="onToggleRead" :class="isRead"> -->
                <!-- <input type="checkBox" @click="onStar" title="Add/Remove star">
                            <span :class="['star-icon']">&starf;</span> -->
                    <!-- <div  @click="onStar" class="star-icon" :class="starState"></div> -->
                    <!-- <div class="rating-stars">
                        <span class="star" @click="onStar">
                            <span :class="['star-icon', 'selected']">&starf;</span>
                        </span>
                    </div> -->

                <div class="email-preview-info">
                    <span class="name">{{email.from}}</span>
                    <div>
                        <span class="subject">{{email.subject}}</span>
                        - 
                        <span class="body">{{email.body}}</span>
                    </div>
                    <span class="sent-at">{{readableTime}}</span>
                </div>
            </article>
        </RouterLink>
    `,

    created() {

    },

    methods: {
        onToggleRead() {
            this.$emit('toggleRead', this.email.id)
        },

        onStar() {
            return this.email.isStar ? false : true
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