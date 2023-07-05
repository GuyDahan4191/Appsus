
export default {
    props: ['email'],
    template: `
        <article class="email-preview-container" 
            @click="onToggleRead" :class="isRead">
            <!-- <input type="checkBox" @click="onToggleStar" title="Add/Remove star">
                        <span :class="['star-icon']">&starf;</span> -->
                <div  @click="onStar" class="star-icon" :class="starState"></div>
                <!-- <div class="rating-stars">
                    <span class="star" @click="setRating">
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
    `,

    created() {

    },

    methods: {
        onToggleRead() {
            this.$emit('toggleRead', this.email.id)
        },

        onStar() {
            this.email.isStar = true
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

        starState() {
            return {
                'active': this.email.isStar
            }
        },
    },
}