import React, { useState, useEffect, useContext } from "react";
import "./AddNote.css";
import PuffLoader from "react-spinners/PuffLoader";
import Alert from "../Alert/Alert";
import noteContext from "../../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote, err } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [titleErr, setTitleErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Add Note | Scribbles";
  }, []);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (note.title.length < 3 || note.description.length < 5) {
      if (note.title.length < 3) {
        setTitleErr(true);
      }
      if (note.description.length < 5) {
        setDescriptionErr(true);
      }
    } else {
      setLoading(true);
      setTimeout(() => {
        addNote(note.title, note.description, note.tag);
        setLoading(false);
        setNote({ title: "", description: "", tag: "" });
        if (err) {
          props.showAlert("Server Timed Out. Try Again!", "danger");
        } else {
          props.showAlert("Note has been added successfully!", "success");
        }
      }, 3000);
    }
  };

  return (
    <>
      <div className="main p-3">
        <Alert alert={props.alert} />

        <div className="container add-note-section">
          <div className="row mt-4">
            <h2 className="display-6">Add a Note</h2>
            <p className="main-txt">
              Capture your thoughts, ideas, and reminders effortlessly with our
              streamlined note-taking feature. Stay organized and never miss a
              beat with ease.
            </p>
          </div>

          <div className="row note mt-5">
            <form action="#">
              <div className="mb-4 d-flex align-items-center">
                {titleErr && (
                  <div className="me-2 me-sm-3">
                    <i
                      className="lni lni-cross-circle"
                      style={{ color: "red" }}
                    ></i>
                  </div>
                )}
                <input
                  type="text"
                  value={note.title}
                  name="title"
                  className="title"
                  placeholder="Title..."
                  onChange={(e) => {
                    onChange(e);
                    setTitleErr(false);
                  }}
                />
              </div>
              <div className="mb-4 d-flex align-items-center">
                {descriptionErr && (
                  <div className="me-2 me-sm-3">
                    <i
                      className="lni lni-cross-circle"
                      style={{ color: "red" }}
                    ></i>
                  </div>
                )}
                <textarea
                  name="description"
                  value={note.description}
                  className="content"
                  rows="7"
                  placeholder="Write your thoughts here..."
                  onChange={(e) => {
                    onChange(e);
                    setDescriptionErr(false);
                  }}
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  value={note.tag}
                  name="tag"
                  className="tag"
                  placeholder="Add a tag (optional)..."
                  onChange={onChange}
                />
              </div>
              <div className="mt-2 d-flex">
                <button
                  type="submit"
                  className="note-btn me-4"
                  onClick={handleSave}
                >
                  Save
                </button>
                <PuffLoader
                  color={"rgb(164, 106, 6)"}
                  loading={loading}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;
