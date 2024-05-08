import React from "react";
import "./Note.css";

const Note = (props) => {
  const { note, updateNote, delNote } = props;

  return (
    <>
      <div className="card my-3 mx-2">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <button className="edit-link" onClick={() => updateNote(note)}>
              <i className="lni lni-pencil-alt"></i>
            </button>
            <button className="delete-link" onClick={() => delNote(note._id)}>
              <i className="lni lni-trash-can"></i>
            </button>
          </div>
          <h6 className="card-subtitle mb-2 mt-0">{note.tag}</h6>
          <hr className="mt-0 mb-3 line" />
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </>
  );
};

export default Note;
