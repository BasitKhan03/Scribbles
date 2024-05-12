import React, { useState, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import Features from "./components/Features/Features";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import AddNote from "./components/AddNote/AddNote";
import Signup from "./components/Signup/Signup";
import NoteState from "./context/notes/NoteState";

function App() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(null);

  const refClose = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      if (credentials.email.length === 0 || credentials.password.length === 0) {
        if (credentials.email.length === 0) {
          setEmailErr(true);
        }
        if (credentials.password.length === 0) {
          setPasswordErr(true);
        }
      } else {
        setLoading(true);

        const response = await fetch(
          "https://scribbles-server.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const json = await response.json();
        console.log(json);

        if (json.success) {
          setLoading(false);
          refClose.current.click();
          localStorage.setItem("token", json.token);
          navigate("/dashboard");
        } else {
          setLoading(false);
          setInvalid(true);
          setMsg("Invalid Email or Password!");
        }
      }
    } catch (err) {
      setLoading(false);
      setInvalid(true);
      setMsg("Server Timed Out. Try Again!");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <>
      <NoteState>
        {localStorage.getItem("token") === null && (
          <Navbar
            credentials={credentials}
            setCredentials={setCredentials}
            handleLogin={handleLogin}
            emailErr={emailErr}
            setEmailErr={setEmailErr}
            passwordErr={passwordErr}
            setPasswordErr={setPasswordErr}
            invalid={invalid}
            setInvalid={setInvalid}
            msg={msg}
            setMsg={setMsg}
            refClose={refClose}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        <div className="wrapper">
          {localStorage.getItem("token") && <Sidebar />}

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/features" element={<Features />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route
              exact
              path="/dashboard"
              element={<Dashboard alert={alert} showAlert={showAlert} />}
            />
            <Route
              exact
              path="/addnote"
              element={<AddNote alert={alert} showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
