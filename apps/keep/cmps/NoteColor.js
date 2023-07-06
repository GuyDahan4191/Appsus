export default {
    template: `
    <form @submit.prevent="onSave" class="add-review">   
              <fieldset>
                  <legend>Color</legend>
                  <input type="radio" value="green" v-model="color">green
                  <input type="radio" value="blue" v-model="color"> blue
                  <input type="radio" value="red" v-model="color"> red
              </fieldset>
     </form>
        `,
    data() {
      return {
       color:""
      };
    },
    methods: {
      onSave() {
        console.log(this.color);
        // this.$emit('setColor', this.color)
      }
    },
  };
  