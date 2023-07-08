export default {
    template: `
      <div className="side-bar-conteiner">
        <ul class="side-bar-list">
          <li @click="onSetFilterByType('NoteTxt', $event)">
            <span class="material-symbols-outlined">title</span>Text
          </li>
          <li @click="onSetFilterByType('NoteImg', $event)">
            <span class="material-symbols-outlined">image</span>Image
          </li>
          <li @click="onSetFilterByType('NoteTodos', $event)">
          <span class="material-symbols-outlined">check_box</span>Todos
          </li>
          <li @click="onSetFilterByType('NoteVideo', $event)">
          <span class="material-symbols-outlined">videocam</span>Video
          </li>
        </ul>
      </div>
    `,
    methods: {
      onSetFilterByType(filterBy, event) {
        event.stopPropagation(); // Stop event propagation
        this.$emit("filterByType", filterBy);
      },
    },
  };
  