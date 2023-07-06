import { emailService } from '../services/mail.service.js'

export default {
    props: ['emails', 'isListShown'],

    template: `
        <div class="email-details-container">
            <section v-if="email" class="email-details">
                
                <div class="email-subject">{{email.subject}}</div>
                <div class="email-from">
                    <span class="email-name">From:
                        &lt{{email.from}}&gt
                    </span>
                </div>
                <!-- <span class="sent-at">{{formattedTime}}</span> -->
                <div class="email-to">To:
                    &lt{{email.to}}&gt
                </div>
                <pre class="email-body">{{email.body}}</pre>
                
                <RouterLink to="/mail" @click="listShown">
                    <span class="material-symbols-outlined">
                        arrow_back
                    </span>
                </RouterLink>
                
                <!-- <RouterLink :to="'/mail/' + email.nextEmaild">Next email</RouterLink> |
                <RouterLink :to="'/mail/' + email.prevEmailId">Prev enail</RouterLink> -->
                <RouterView/>
                
            </section>
        </div>
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
        listShown(isListShown) {
            this.isListShown = !isListShown
        },
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