import React, { useState, useEffect, useRef, useContext } from "react";
import "./Dashboard.css";
import PuffLoader from "react-spinners/PuffLoader";
import Note from "../Note/Note";
import Alert from "../Alert/Alert";
import noteContext from "../../context/notes/noteContext";

const Dashboard = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote, user, getUser, err } = context;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const [delNoteId, setDelNoteId] = useState(null);
  const [titleErr, setTitleErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);
  const refClose = useRef(null);
  const refDel = useRef(null);
  const refDelClose = useRef(null);

  useEffect(() => {
    getNotes();
    getUser();
  }, []);

  useEffect(() => {
    const modalElement = document.getElementById("exampleModal");
    modalElement.addEventListener("hidden.bs.modal", handleModalClose);
    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, []);

  const handleModalClose = () => {
    setTitleErr(false);
    setDescriptionErr(false);
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const delNote = (id) => {
    refDel.current.click();
    setDelNoteId(id);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    if (note.etitle.length < 3 || note.edescription.length < 5) {
      if (note.etitle.length < 3) {
        setTitleErr(true);
      }
      if (note.edescription.length < 5) {
        setDescriptionErr(true);
      }
    } else {
      setLoading(true);
      setTimeout(() => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setLoading(false);
        refClose.current.click();
        if (err) {
          props.showAlert("Server Timed Out. Try Again!", "danger");
        } else {
          props.showAlert("Note has been edited Successfully!", "success");
        }
      }, 2000);
    }
  };

  const handleDelete = () => {
    refDelClose.current.click();
    deleteNote(delNoteId);

    if (err) {
      props.showAlert("Server Timed Out. Try Again!", "danger");
    } else {
      props.showAlert("Note has been deleted Successfully!", "success");
    }
  };

  return (
    <>
      <div className="main p-3">
        <Alert alert={props.alert} />

        <div className="container your-note-section">
          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            ref={ref}
          >
            Launch edit modal
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header px-4">
                  <h1 className="modal-title" id="exampleModalLabel">
                    Edit Note
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form action="#">
                    <div className="mb-4 d-flex align-items-center">
                      <input
                        type="text"
                        name="etitle"
                        className="etitle"
                        placeholder="Title..."
                        value={note.etitle}
                        onChange={(e) => {
                          onChange(e);
                          setTitleErr(false);
                        }}
                      />
                      {titleErr && (
                        <div
                          className="position-absolute"
                          style={{ top: "19px", right: "30px" }}
                        >
                          <i
                            className="lni lni-cross-circle"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                      )}
                    </div>
                    <div className="mb-4 d-flex align-items-center">
                      <textarea
                        name="edescription"
                        className="econtent"
                        rows="7"
                        placeholder="Write your thoughts here..."
                        value={note.edescription}
                        onChange={(e) => {
                          onChange(e);
                          setDescriptionErr(false);
                        }}
                      />
                      {descriptionErr && (
                        <div
                          className="position-absolute"
                          style={{ top: "75px", right: "30px" }}
                        >
                          <i
                            className="lni lni-cross-circle"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                      )}
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        name="etag"
                        className="etag"
                        placeholder="Add a tag (optional)..."
                        value={note.etag}
                        onChange={onChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <PuffLoader
                        color={"rgb(164, 106, 6)"}
                        loading={loading}
                        size={35}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        className="ms-2"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-secondary close-btn me-2"
                        data-bs-dismiss="modal"
                        ref={refClose}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary save-btn"
                        onClick={handleSave}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
            ref={refDel}
          >
            Launch delete modal
          </button>

          <div
            className="modal fade"
            id="exampleModal1"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title" id="exampleModalLabel">
                    Delete Note
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body del-modal-body">
                  Do you want to delete this note permenantly?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary close-btn me-2"
                    data-bs-dismiss="modal"
                    ref={refDelClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary del-btn"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <p className="sub-txt mb-0">Ready to start taking notes?</p>
            <h2 className="display-6">{user && user.name}'s Home</h2>
            <p className="main-txt mt-2">
              Welcome to your digital notebook, where every idea finds its
              place. Dive into your curated archive of notes, meticulously
              categorized and effortlessly accessible, empowering you to
              capture, organize, and revisit your thoughts with ease.
            </p>
          </div>

          <div className="row mt-4">
            <h2 className="display-7">My Notes</h2>
            {notes.length === 0 && (
              <div className="col-lg-3 img-container d-flex flex-column justify-content-center align-items-center">
                <img
                  src={require("../../assets/no-notes.png")}
                  alt="background"
                  className="img-fluid"
                />
                <p className="main-txt">No Notes Found!</p>
              </div>
            )}
            {notes.map((note) => {
              return (
                <div className="col-lg-3">
                  <Note
                    key={note._id}
                    delNote={delNote}
                    updateNote={updateNote}
                    note={note}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
