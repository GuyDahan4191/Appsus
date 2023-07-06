export default {
  props: ["info"],
  template: `
      <img class="img-preview" :src="imgUrl" alt="" />
      `,
  data() {
    return {}
  },

  methods: {
    onOpenColor(noteId) {
      alert(noteId)
    }
  },

  computed: {
    imgUrl() {
      return this.info.url
    }

  }
};
