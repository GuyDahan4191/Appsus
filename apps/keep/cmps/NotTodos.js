export default {
  props: ["info"],
  template: `
    <div class="todo-container">
      <div className="todo-title">
        <h2>{{ info.title }}</h2>
      </div>

      <div className="todo-list">
        <div v-for="todo in info.todos" :key="todo.txt" class="todos-list">
          <span 
          class="material-symbols-outlined"
          v-if="!todo.doneAt"
          @click.stop="toggleDone(todo)">
          check_box_outline_blank
        </span>
        <span 
        class="material-symbols-outlined"
        v-else
        @click.stop="toggleDone(todo)"
        >
        check_box
      </span>
      <div class="todo-input" @click.stop="toggleDone(todo)">
        <h2>{{ todo.txt }}</h2>
      </div>
        <h2>{{ todo.doneAt }}</h2>
    </div>
  </div>
</div>

  `,
  methods: {
    toggleDone(todo) {
      if (todo.doneAt) {
        todo.doneAt = null;
      } else {
        todo.doneAt = new Date().toLocaleString();
      }
    },
  },
};
