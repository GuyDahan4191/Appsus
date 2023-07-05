
export default {
    props: ['email'],
    template: `
        <article class="email-preview-container">
            <button @click="onToggleStar" title="Add/Remove star">Star</button>
            <div class="email-preview-info" @click="onOpenEmail">
                <span class="name">{{email.from}}</span>
                <span class="subject">{{email.subject}}</span>
                <span class="body">{{email.body}}</span>
                <span class="sent-at">{{email.sentAt}}</span>
            </div>
        </article> 
    `,

    created() {

    },

    methods: {
        onOpenEmail() {
            this.$emit('openEmail', this.email)
        }
    },

}