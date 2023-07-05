import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js";

export const noteService = {
  query,
  get,
  post,
  save,
  remove,
  getEmptyNote,
};

const NOTES_KEY = "noteDB";

const loggedinUser = {
  email: "shay@appsus.com",
  fullname: "Shay Zigdon",
};

_createNotes()

function query() {
  return storageService.query(NOTES_KEY)
  .then((notes) => {
    return notes;
  });
}

function getEmptyNote(title) {
  return { id: '', title,  }
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function post(newNote) {
  return storageService.post(NOTES_KEY, newNote);
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_KEY, note);
  } else {
    return storageService.post(NOTES_KEY, note);
  }
}

function _createNotes() {
  let notes = utilService.load(NOTES_KEY) || [];
  if (!notes || !notes.length) {
    const notes = [
      {
        id: "n101",
        createdAt: 1112222,
        type: "NoteTxt",
        isPinned: true,
        style: {
          backgroundColor: "#00d",
        },
        info: {
          txt: "Fullstack Me Baby!",
        },
      },
      {
        id: "n102",
        createdAt: 11343422,
        type: "NoteTxt",
        isPinned: false,
        style: {
          backgroundColor: "#02d",
        },
        info: {
          txt: "Hello There!",
        },
      },
      {
        id: "n103",
        createdAt: 1112222,
        type: "NoteTxt",
        isPinned: true,
        style: {
          backgroundColor: "#00d",
        },
        info: {
          txt: "Keep Going!!",
        },
      },

      // {
      //   id: "n102",
      //   type: "NoteImg",
      //   isPinned: false,
      //   info: {
      //     url: "http://some-img/me",
      //     title: "Bobi and Me",
      //   },
      //   style: {
      //     backgroundColor: "#00d",
      //   },
      // },
      
      // {
      //   id: "n103",
      //   type: "NoteTodos",
      //   isPinned: false,
      //   info: {
      //     title: "Get my stuff together",
      //     todos: [
      //       { txt: "Driving license", doneAt: null },
      //       { txt: "Coding power", doneAt: 187111111 },
      //     ],
      //   },
      // },
    ];
    utilService.save(NOTES_KEY, notes);
  }
}
