export default {
  props: ["note"],
  template: `
<div className="note-preview">
    <h2> {{note.info.txt }}</h2>
</div>
    `,
  components: {},
};
