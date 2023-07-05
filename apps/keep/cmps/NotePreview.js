import NoteTodos from "../cmps/NotTodos.js";
import NoteImg from "../cmps/NoteImg.js";
import NoteVideo from "../cmps/NoteVideo.js";
import NoteTxt from "../cmps/NoteTxt.js";

export default {
  props: ["note"],
  template: `
   <Component
         :is="note.type"
         :info="note.info"
         />
    `,
  components: {
    NoteTodos,
    NoteImg,
    NoteVideo,
    NoteTxt,
  },
};
