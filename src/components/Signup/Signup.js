import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import "./Signup.css";

const Signup = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    repPassword: "",
  });
  const [invalid, setInvalid] = useState(false);
  const [msg, setMsg] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [repPasswordErr, setRepPasswordErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    try {
      e.preventDefault();

      if (
        details.name === "" ||
        details.email === "" ||
        details.password === "" ||
        details.repPassword === ""
      ) {
        if (details.name === "") {
          setNameErr(true);
        }
        if (details.email === "") {
          setEmailErr(true);
        }
        if (details.password === "") {
          setPasswordErr(true);
        }
        if (details.repPassword === "") {
          setRepPasswordErr(true);
        }
      } else if (details.password !== details.repPassword) {
        setMsg("Password do not match!");
        setInvalid(true);
      } else {
        setLoading(true);
        setInvalid(false);
        setMsg("");

        const response = await fetch(
          "https://scribbles-server.onrender.com/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: details.name,
              email: details.email,
              password: details.password,
            }),
          }
        );

        const json = await response.json();
        console.log(json);

        if (json.success) {
          setTimeout(() => {
            setLoading(false);
            setMsg("Account has been created successfully!");
            setDetails({ name: "", email: "", password: "", repPassword: "" });
            setTimeout(() => {
              setMsg("");
            }, 4000);
          }, 2500);
        } else {
          setLoading(false);
          setInvalid(true);
          setMsg("Email Address already exists!");
        }
      }
    } catch (err) {
      setLoading(false);
      setInvalid(true);
      setMsg("Server Timed Out. Try Again!");
    }
  };

  return (
    <>
      <div className="container pt-5 pb-5 signup">
        <div className="row home-row">
          <div className="col-md-8 txt-container">
            <div>
              <h1 className="display-6">Create Your Account!</h1>
              <p className="txt mb-4">
                Start capturing your thoughts and ideas with Scribbles. Join now
                and never forget a great idea again!
              </p>
              <div className="d-flex align-items-center">
                {invalid && (
                  <i
                    className="lni lni-warning me-2"
                    style={{ color: "red" }}
                  ></i>
                )}
                <p className="err-msg">{msg}</p>
              </div>
              <form className="mt-4" onSubmit={handleSignup}>
                <div className="mb-4 d-flex align-items-center">
                  <i
                    className="lni lni-user me-3"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <input
                    type="text"
                    className="form-control signup-form"
                    id="name"
                    name="name"
                    value={details.name}
                    placeholder="Your Name"
                    onChange={(e) => {
                      onChange(e);
                      setNameErr(false);
                      setMsg("");
                      setInvalid(false);
                    }}
                  />
                  {nameErr && (
                    <i
                      className="lni lni-cross-circle ms-2"
                      style={{ color: "red", position: "relative", top: "2px" }}
                    ></i>
                  )}
                </div>
                <div className="mb-4 d-flex align-items-center">
                  <i className="lni lni-envelope me-3"></i>
                  <input
                    type="email"
                    className="form-control signup-form"
                    id="email"
                    name="email"
                    value={details.email}
                    placeholder="Your Email"
                    onChange={(e) => {
                      onChange(e);
                      setEmailErr(false);
                      setMsg("");
                      setInvalid(false);
                    }}
                  />
                  {emailErr && (
                    <i
                      className="lni lni-cross-circle ms-2"
                      style={{
                        color: "red",
                        position: "relative",
                        top: "2px",
                        left: "3px",
                      }}
                    ></i>
                  )}
                </div>
                <div className="mb-4 d-flex align-items-center">
                  <i
                    className="lni lni-lock-alt me-3"
                    style={{ fontSize: "18px" }}
                  ></i>
                  <input
                    type="password"
                    className="form-control signup-form"
                    id="password"
                    name="password"
                    value={details.password}
                    placeholder="Password"
                    onChange={(e) => {
                      onChange(e);
                      setPasswordErr(false);
                      setMsg("");
                      setInvalid(false);
                    }}
                    minLength={5}
                  />
                  {passwordErr && (
                    <i
                      className="lni lni-cross-circle ms-2"
                      style={{ color: "red", position: "relative", top: "2px" }}
                    ></i>
                  )}
                </div>
                <div className="mb-5 d-flex align-items-center">
                  <i
                    className="lni lni-lock me-3"
                    style={{ fontSize: "19px" }}
                  ></i>
                  <input
                    type="password"
                    className="form-control signup-form"
                    id="repPassword"
                    name="repPassword"
                    value={details.repPassword}
                    placeholder="Repeat your password"
                    onChange={(e) => {
                      onChange(e);
                      setRepPasswordErr(false);
                      setMsg("");
                      setInvalid(false);
                    }}
                    minLength={5}
                  />
                  {repPasswordErr && (
                    <i
                      className="lni lni-cross-circle ms-2"
                      style={{ color: "red", position: "relative", top: "2px" }}
                    ></i>
                  )}
                </div>
                <div className="mt-2 d-flex align-items-center">
                  <button type="submit" className="signupBtn me-3">
                    Signup!
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
          <div className="col-md-4 img-container">
            <img
              src={require("../../assets/beautiful-landscape-2.png")}
              alt="background"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
