import { emailService } from '../services/mail.service.js'

export default {
    props: ['emails'],

    template: `
        <section v-if="email" class="email-details-container">

            <span class="email-subject">{{email.subject}}</span>
            <div class="email-from">
                <span class="email-name">
                    From: &lt{{email.from}}&gt
                </span>
                <div>
                    <span 
                        @click="onStar" 
                        class="star material-symbols-outlined"
                        :class="{'star-true': email.isStar,
                                'star-false': !email.isStar}"
                    >star</span>
                    <!-- @click.stop="onReply" -->
                    <span class="reply">
                        <span class="material-symbols-outlined">reply</span>
                    </span>
                </div>
            </div>
            <!-- <span class="sent-at">{{formattedTime}}</span> -->
            <div class="email-to">
                    To: &lt{{email.to}}&gt
            </div>
            <pre class="email-body">{{email.body}}</pre>
            
            <RouterLink to="/mail" class="back-to-list">Back to emails</RouterLink>

            <!-- <RouterLink :to="'/mail/' + email.nextEmaild">Next email</RouterLink> |
            <RouterLink :to="'/mail/' + email.prevEmailId">Prev enail</RouterLink> -->
            <RouterView/>

        </section>
    `,

    data() {
        return {
            email: null,
        }
    },

    created() {
        // this.loadEmail()
        console.log('details')
        const { emailId } = this.$route.params
        emailService.get(emailId)
            .then(email => {
                this.email = email
                console.log('nooooooooo errorrrrrrrr:')
            })
            .catch(err => {
                alert('Cannot load email')
                this.$router.push('/mail')
            })
    },

    methods: {
        onStar(emailId) {
            console.log('on star in list')
            this.$emit('star', emailId)
        },
    },
}
