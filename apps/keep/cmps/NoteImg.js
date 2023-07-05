export default {
  props: ["info"],
    template: `
      <h2>note Img</h2>
      <img :src="imgUrl" alt="" />
      `,

      computed: {
        imgUrl() {
          return this.info.url
        }
        
      }
  };
  