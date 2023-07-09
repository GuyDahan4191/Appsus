import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";

export const noteService = {
  query,
  get,
  post,
  save,
  remove,
  getEmptyNote,
  resetId,
  setPinNote
};

const NOTES_KEY = "noteDB";

const loggedinUser = {
  email: "shay@appsus.com",
  fullname: "Shay Zigdon",
};

_createNotes();

function query() {
  return storageService.query(NOTES_KEY)
    .then((notes) => {
      return notes;
    });
}

function getEmptyNote() {
  return {
    id: "",
    createdAt: 122333,
    type: "",
    isPinned: false,
    style: {
      backgroundColor: "#ffff",
    },
    info: {},
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

function resetId(note) {
  note.id = ''
}

function setPinNote(note) {
  note.isPinned = true
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
        id: "n102",
        createdAt: 1112222,
        type: "NoteTxt",
        isPinned: false,
        style: {
          backgroundColor: "#7676ff",
        },
        info: {
          title:"",
          txt: "Remebmer to remember!!",
        },
      },
      {
        id: "n123",
        type: "NoteImg",
        isPinned: false,
        info: {
          url: "https://images.unsplash.com/photo-1682686581312-506a8b53190e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          title: "My next vacation",
        },
        style: {
          backgroundColor: "#ffff",
        },
      },
      
      {
        id: "n103",
        type: "NoteImg",
        isPinned: false,
        info: {
          url: "https://plus.unsplash.com/premium_photo-1664701475272-953393050754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
          title: "Bobi",
        },
        style: {
          backgroundColor: "#ffff",
        },
      },
      {
        id: "n106",
        type: "NoteTodos",
        isPinned: false,
        style: {
          backgroundColor: "#ffff",
        },
        info: {
          title: "Get my stuff together",
          todos: [
            { txt: "Take my dogs out", doneAt: null },
            { txt: "Doing my project", doneAt: null },
            { txt: "Make some dinner", doneAt: null },
            { txt: "Plan my trip", doneAt: null },
          ],
        },
      },
      {
        id: "n104",
        type: "NoteVideo",
        isPinned: false,
        info: {
          url: "https://www.youtube.com/watch?v=HjOTyTXBb9s",
          title: "GitHub Lesson",
        },
        style: {
          backgroundColor: "#ffff",
        },
      },
      {
        id: "n101",
        createdAt: 1112222,
        type: "NoteTxt",
        isPinned: false,
        style: {
          backgroundColor: "#ffff78",
        },
        info: {
          title:"",
          txt: "Take my dog!",
        },
      },
      {
        id: "n106",
        type: "NoteTodos",
        isPinned: false,
        style: {
          backgroundColor: "#ffff",
        },
        info: {
          title: "Get my stuff together",
          todos: [
            { txt: "Driving license", doneAt: null },
            { txt: "Coding power", doneAt: null },
          ],
        },
      },
    ];
    utilService.save(NOTES_KEY, notes);
  }
}
