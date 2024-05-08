import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Features.css";
import "./Style.css";

const Features = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="container px-4 py-5" id="hanging-icons">
        <div className="features">
          <h2 className="display-6">Offerings</h2>
          <p className="pb-3 border-bottom main-txt">
            Step into the vibrant core of Scribbles, where cutting-edge
            innovation converges with unparalleled functionality. Dive into a
            wealth of meticulously crafted features meticulously designed to
            revolutionize your note-taking journey and empower your productivity
            like never before.
          </p>
        </div>

        <div className="row g-4 py-3 row-cols-1 row-cols-lg-3 pb-5">
          <div className="col d-flex align-items-start mt-5">
            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
              <img
                src={require("../../assets/writing.png")}
                width={24}
                alt=""
              />
            </div>
            <div>
              <h2 className="h2">Intuitive Note Editor</h2>
              <p className="sub-txt">
                Say goodbye to cluttered interfaces and hello to simplicity. Our
                intuitive note editor provides a distraction-free writing
                environment, allowing you to focus solely on your ideas. With
                formatting options at your fingertips, creating beautifully
                structured notes has never been easier.
              </p>
              <a href="/" className="feature-btn">
                Learn more
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start mt-5">
            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
              <img src={require("../../assets/cloud.png")} width={30} alt="" />
            </div>
            <div>
              <h2 className="h2">Seamless Cloud Sync</h2>
              <p className="sub-txt">
                Your notes, always within reach. With seamless cloud
                synchronization, your notes are automatically backed up and
                synced across all your devices. Whether you're on your laptop,
                tablet, or smartphone, your notes are just a click away,
                ensuring you never miss a beat.
              </p>
              <a href="/" className="feature-btn">
                Learn more
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start mt-5">
            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
              <img src={require("../../assets/layer.png")} width={25} alt="" />
            </div>
            <div>
              <h2 className="h2">Custom Organization</h2>
              <p className="sub-txt">
                Organize your notes your way. You have the flexibility to create
                folders, tags, and categories to suit your unique needs. Whether
                you prefer a hierarchical structure or a tag-based system,
                Scribbles empowers you to organize your notes with precision and
                ease.
              </p>
              <a href="/" className="feature-btn">
                Learn more
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start mt-5">
            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
              <img src={require("../../assets/search.png")} width={23} alt="" />
            </div>
            <div>
              <h2 className="h2">Advanced Search Functionality</h2>
              <p className="sub-txt">
                Find what you need, when you need it. Our advanced search
                functionality allows you to quickly locate specific notes,
                keywords, or phrases within your vast collection of notes. With
                filters and sorting options, finding that elusive idea has never
                been simpler.
              </p>
              <a href="/" className="feature-btn">
                Learn more
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start mt-5">
            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
              <img
                src={require("../../assets/cross-platform.png")}
                width={40}
                alt=""
              />
            </div>
            <div>
              <h2 className="h2">Cross-Platform Accessibility</h2>
              <p className="sub-txt">
                Access your notes anytime, anywhere. With cross-platform
                accessibility, [Your Website Name] is available on all your
                favorite devices, including laptops, tablets, and smartphones.
                Whether you're at home, in the office, or on the go, your notes
                are right there with you.
              </p>
              <a href="/" className="feature-btn">
                Learn more
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start mt-5">
            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
              <img
                src={require("../../assets/verified.png")}
                width={25}
                alt=""
              />
            </div>
            <div>
              <h2 className="h2">Security and Privacy</h2>
              <p className="sub-txt">
                Your privacy is our priority. With industry-leading security
                measures, including end-to-end encryption and secure
                authentication protocols, your notes are safeguarded against
                unauthorized access. Rest easy knowing that your ideas are
                protected, always.
              </p>
              <a href="/" className="feature-btn">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
