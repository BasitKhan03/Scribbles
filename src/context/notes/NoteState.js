import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://scribbles-server.onrender.com";
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [err, setErr] = useState(false);

  const getUser = async () => {
    try {
      setErr(false);

      const response = await fetch(`${host}/api/auth/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setUser(json);
    } catch (err) {
      setErr(true);
    }
  };

  const getNotes = async () => {
    try {
      setErr(false);

      const response = await fetch(`${host}/api/notes/getnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setNotes(json);
    } catch (err) {
      setErr(true);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      setErr(false);

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          description,
          tag: tag === "" ? "General" : tag,
        }),
      });

      const json = await response.json();
      setNotes(notes.concat(json));
    } catch (err) {
      setErr(true);
    }
  };

  const deleteNote = async (id) => {
    try {
      setErr(false);

      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      console.log(json);

      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    } catch (err) {
      setErr(true);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      setErr(false);

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));

      for (let i = 0; i < newNotes.length; i++) {
        if (newNotes[i]._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        getNotes,
        addNote,
        deleteNote,
        editNote,
        user,
        getUser,
        err,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
