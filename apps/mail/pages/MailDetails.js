import { emailService } from '../services/mail.service.js'

export default {
    props: ['emails'],
    emit: ['star'],
    template: `
        <section v-if="email" class="email-details-container">

            <span class="email-subject">{{email.subject}}</span>
            <div class="email-from">
                <span class="email-name">
                    From: &lt{{email.from}}&gt
                </span>
                <div>
                    <span @click.stop="onStar" class="star" 
                        :class="{'star-true': email.isStar,
                        'star-false': !email.isStar}">
                        <span class="material-symbols-outlined">star</span>
                    </span>
                    <span @click.stop="onReply" class="reply">
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
        onStar() {
            this.email.isStar = !this.email.isStar
            this.$emit('star', this.email.id)
        },
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
}
