import { utilService } from "../../../services/util.service.js";
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

_createNotes();

function query() {
  return storageService.query(NOTES_KEY).then((notes) => {
    return notes;
  });
}

function getEmptyNote(txt) {
  return {
    id: "",
    createdAt: 122333,
    type: "NoteTxt",
    isPinned: false,
    style: {
      backgroundColor: "#00d",
    },
    info: { txt },
  };
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
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
      {
        id: "n106",
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
      {
        id: "n102",
        type: "NoteImg",
        isPinned: false,
        info: {
          url: "https://plus.unsplash.com/premium_photo-1664701475272-953393050754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
          title: "Bobi and Me",
        },
        style: {
          backgroundColor: "#00d",
        },
      },

      {
        id: "n103",
        type: "NoteTodos",
        isPinned: false,
        info: {
          title: "Get my stuff together",
          todos: [
            { txt: "Driving license", doneAt: null },
            { txt: "Coding power", doneAt: 187111111 },
          ],
        },
      },
    ];
    utilService.save(NOTES_KEY, notes);
  }
}
