import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container pt-3 pb-3 home">
        <div className="row home-row">
          <div className="col-md-8 txt-container">
            <div>
              <h1 className="display-4">Forget About Your Messy Notes !</h1>
              <p className="txt">
                Our note-taking app is here to rescue you! With our
                user-friendly interface and powerful features, you can take
                notes effortlessly and manage them effectively.
              </p>
            </div>
            <div style={{ marginTop: "22px" }}>
              <Link to="/signup">
                <button className="joinBtn">Join us now!</button>
              </Link>
            </div>
          </div>
          <div className="col-md-4 img-container">
            <img
              src={require("../../assets/beautiful-landscape.png")}
              alt="background"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
