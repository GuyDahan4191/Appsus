export default {
    emits: ['close', 'send', 'draft'],
    template: `
        <div class="new-email-container">
            <form @submit.prevent="onSend" class="compose-email">
                <div class="new-header">
                    <p class="new-messege">New Message</p>
                    <p class="new-close" @click="onClose">X</p>
                </div>
                <input class="new-to" v-model="to" required type="email" placeholder="Recipients"/>
                <input class="new-subject" v-model="subject" required type="text" placeholder="Subject"/>
                <textarea class="new-body" v-model="body" placeholder="Text go here..."></textarea>
                <button class="send-btn" type="submit">Send</button>
            </form>
        </div>
    `,

    data() {
        return {
            subject: null,
            to: null,
            body: null
        }
    },
    methods: {
        onSend() {
            this.$emit('send', {
                to: this.to,
                subject: this.subject,
                body: this.body
            })
        },

        onClose() {
            this.$emit('close', {
                draft: this.draft,
            })
        }
    }
}
