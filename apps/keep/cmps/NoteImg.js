export default {
  props: ["info"],
  template: `
  <div className="img-conteiner">
    <h2> {{ info.title }}</h2>
    <img class="img-preview" :src="imgUrl" alt="" />
  </div>
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
