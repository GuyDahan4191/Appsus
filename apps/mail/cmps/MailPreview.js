
export default {
    props: ['email'],
    template: `
        <!-- <article>{{ email }}</article> -->
        <article class="email-preview">
            <div class="txt-container">
                <span class="name">{{email.from}}</span>
                <span class="subject">{{email.subject}}</span>
                <span class="body">{{email.body}}</span>
            </div>
            <span class="sent-at">{{email.sentAt}}</span>
            <div class="actions">
                button delete
                button read
            </div>
        </article> 
    `,

    created() {

    },

    methods: {

    },


    computed: {

    },
}