import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About | Scribbles";
  }, []);

  return (
    <>
      <div className="container pt-5 pb-5">
        <div className="row about-row">
          <div className="col-lg-8">
            <h1 className="display-6">Welcome to Scribbles</h1>
            <div style={{ marginTop: "40px" }}>
              <h2 className="h2">Your Personal Note-Taking Sanctuary</h2>
              <p className="main-text">
                At Scribbles, we believe that every great idea, thought, and
                inspiration deserves a home. That's why we've crafted a space
                just for you—a digital haven where your notes can flourish and
                your ideas can thrive.
              </p>
            </div>
            <div style={{ marginTop: "40px" }}>
              <h2 className="h2">What Sets Us Apart</h2>
              <p className="main-text">
                With an intuitive interface designed with you in mind, Scribbles
                offers a seamless note-taking experience. Whether you're jotting
                down quick thoughts, drafting detailed plans, or organizing your
                life, our platform is here to support you every step of the way.
              </p>
            </div>
          </div>
          <div className="col-lg-4 img-div">
            <img
              src={require("../../assets/tasklist.png")}
              alt="background"
              className="img-fluid"
            />
          </div>
        </div>

        <div className="row about-row last-row pos">
          <div className="col-12">
            <h2 className="h2">Our Mission</h2>
            <p className="main-text">
              At Scribbles, our mission is simple: to empower you to capture,
              create, and collaborate with ease. We believe that everyone has
              the potential to achieve greatness, and it all starts with a
              single idea. With Scribbles, your ideas have a home—and the
              possibilities are endless.
            </p>
          </div>
        </div>

        <div className="row about-row last-row pos">
          <div className="col-12">
            <h2 className="h2">Why Choose Scribbles?</h2>
            <ul>
              <li style={{ listStyleType: "disc" }}>
                <p className="main-text">
                  <b>Secure Cloud Storage:</b> Your notes are precious, which is
                  why we prioritize security. Rest assured, your data is
                  encrypted and stored securely in the cloud, accessible only to
                  you.
                </p>
              </li>
              <li style={{ listStyleType: "disc" }}>
                <p className="main-text">
                  <b>Customizable Organization:</b> Tailor your note-taking
                  experience to fit your unique style. With customizable
                  organization features, you can arrange your notes just the way
                  you like, making it easier than ever to stay organized.
                </p>
              </li>
              <li style={{ listStyleType: "disc" }}>
                <p className="main-text">
                  <b>Cross-Platform Accessibility:</b> Access your notes
                  anytime, anywhere, on any device. Whether you're on your
                  laptop, tablet, or smartphone, Scribbles is ready to accompany
                  you wherever inspiration strikes.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
