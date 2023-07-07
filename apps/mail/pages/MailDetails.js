import { emailService } from '../services/mail.service.js'

export default {
    props: ['emails'],
    template: `
        <section v-if="email" class="email-details-container">

            <span class="email-subject">{{email.subject}}</span>
            <div class="email-from">
                <span class="email-name">
                    {{email.from}}
                </span>
            </div>
            <!-- <span class="sent-at">{{formattedTime}}</span> -->
            <div class="email-to">
                    &lt{{email.to}}&gt
            </div>
            <pre class="email-body">{{email.body}}</pre>
            
            <RouterLink to="/mail">Back to emails</RouterLink>

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
        // loadEmail() {
        //     const { emailId } = this.$route.params
        //     emailService.get(emailId)
        //         .then(email => this.email = email)
        //         .catch(err => {
        //             alert('Cannot load email')
        //             this.$router.push('/mail')
        //         })
        // },

        // returnToList() {
        //     this.$router.push('/email')
        //     this.showDetails = false
        // }
    },

    // watch: {
    //     emailId() {
    //         this.loadEmail()
    //     },
    // },

    // computed: {
    //     emailId() {
    //         return this.$route.params.emailId
    //     },
    // },
}