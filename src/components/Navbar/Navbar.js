import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import "./Navbar.css";

const Navbar = (props) => {
  const {
    credentials,
    setCredentials,
    emailErr,
    setEmailErr,
    passwordErr,
    setPasswordErr,
    invalid,
    setInvalid,
    msg,
    setMsg,
    loading,
  } = props;

  const [navbar, setNavbar] = useState(false);

  const onScroll = () => {
    if (window.scrollY >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", onScroll);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const modalElement = document.getElementById("loginModal");
    modalElement.addEventListener("hidden.bs.modal", handleModalClose);
    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, []);

  const handleModalClose = () => {
    setEmailErr(false);
    setPasswordErr(false);
    setInvalid(false);
    setCredentials({ email: "", password: "" });
  };

  return (
    <>
      <div
        className="modal"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div
                className="mb-2"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2
                  className="display-6 my-2"
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "rgb(164, 106, 6)",
                    textUnderlineOffset: "4px",
                  }}
                >
                  Sign in
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={props.refClose}
                  style={{ position: "relative", left: "165px", top: "-8px" }}
                ></button>
              </div>

              {invalid && (
                <div className="d-flex justify-content-center mt-2">
                  <i
                    className="lni lni-warning me-2"
                    style={{ color: "red", position: "relative", top: "2px" }}
                  ></i>
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.9rem",
                      textDecoration: "underline",
                    }}
                  >
                    {msg}
                  </p>
                </div>
              )}

              <div className="d-flex justify-content-center mb-2">
                <div style={{ position: "relative", left: "-8px" }}>
                  <PuffLoader
                    color={"rgb(164, 106, 6)"}
                    loading={loading}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              </div>

              <div className="mt-2 mb-3 px-4">
                <form onSubmit={props.handleLogin}>
                  <div className="mb-3">
                    <div className="d-flex">
                      <i
                        className="lni lni-envelope me-2"
                        style={{ position: "relative", top: "2px" }}
                      ></i>
                      <label
                        htmlFor="email"
                        className="form-label login-form-label"
                      >
                        Email address
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        type="email"
                        className="form-control login-form-input"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={(e) => {
                          onChange(e);
                          setEmailErr(false);
                          setInvalid(false);
                          setMsg("");
                        }}
                      />
                      {emailErr && (
                        <div className="ms-2">
                          <i
                            className="lni lni-cross-circle"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex">
                      <i
                        className="lni lni-lock me-2"
                        style={{ position: "relative", top: "2px" }}
                      ></i>
                      <label
                        htmlFor="password"
                        className="form-label login-form-label"
                      >
                        Password
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        type="password"
                        className="form-control login-form-input"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={(e) => {
                          onChange(e);
                          setPasswordErr(false);
                          setInvalid(false);
                          setMsg("");
                        }}
                      />
                      {passwordErr && (
                        <div className="ms-2">
                          <i
                            className="lni lni-cross-circle"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary login-btn my-2"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header>
        <nav className={`navbar ${navbar ? "scroll-shadow" : ""}`}>
          <Link to="/">
            <div className="logo">
              <div className="logo-text-div">
                <h1 className="logoHeading">Scribbles</h1>
              </div>
            </div>
          </Link>

          <ul className="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label htmlFor="checkbox_toggle" className="hamburger">
              &#9776;
            </label>
            <div className="menu">
              <li>
                <NavLink activeClassName="active" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/features">
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <Link>Contact</Link>
              </li>
              <li>
                <Link className="cta">
                  <button
                    className="headerBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;