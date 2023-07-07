export default {
  props: ["info"],
  template: `
    <div className="video-conteiner">
      <h2>{{ info.title }}</h2>
      <iframe :src="videoUrl" allowfullscreen></iframe>
    </div>
      `,
  computed: {
    videoUrl() {
      const videoId = this.getYouTubeVideoId(this.info.url);
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },
  methods: {
    getYouTubeVideoId(url) {
      const regex =
        /^(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu.be\/)([^\s&]+)/;
      const match = url.match(regex);
      if (match && match[1]) {
        return match[1];
      } else {
        return "";
      }
    },
  },
};