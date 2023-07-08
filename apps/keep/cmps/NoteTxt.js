export default {
  props: ["info"],

    template: `
    <div className="text-conteiner">
      <div className="title">
        <h2 class="user-text">{{ info.title }}</h2>
      </div>
      <div className="txt">
        <h2 class="user-text">{{ info.txt }}</h2>
      </div>
    </div>
      `,
    components: {},
  };
  