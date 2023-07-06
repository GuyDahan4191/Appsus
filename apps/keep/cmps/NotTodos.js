export default {
  props: ["info"],
    template: `
      <h2>TO DOS</h2>
      <h2>{{ info.title }}</h2>
      <div  v-for="todo in info.todos"
       className="todos-list">
        <h2>{{ todo.txt }}</h2> <h2>{{ todo.doneAt }}</h2>
      </div>
      `,
      data() {

      },

     computed: {
    },
    components: {},
  };
  