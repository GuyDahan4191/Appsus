
export default {
    name: 'EmailPreview',
    props: ['email'],

    template: `
        <RouterLink :to="'/mail/' + email.id">
            <article>
                <section class="line-preview">
                    <span class="name">{{email.from}}</span>
                    <div class="subject-body">
                        <span class="subject">{{email.subject}}</span>
                        - 
                        <span class="body">{{email.body}}</span>
                    </div>
                    <span class="sent-at">{{readableTime}}</span>
                </section>    
            </article> 
        </RouterLink>
    `,

    created() {
    },

    methods: {
    },

    computed: {
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