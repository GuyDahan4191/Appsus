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
            this.$emit('filter', this.filterBy)
        }
    }
}