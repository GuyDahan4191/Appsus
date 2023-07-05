export default {
    template: `
        <div class="email-filter">
            <input 
                v-model="filterBy.txt" 
                @input="onSetFilterBy"
                type="text" 
                placeholder="Search mail">
        </div>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
            }
        }
    },

    methods: {
        onSetFilterBy() {
            console.log('searching in mailFilter:')
            this.$emit('filter', this.filterBy)
        }
    }
}