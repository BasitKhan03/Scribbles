import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggle = () => {
    setExpand(!expand);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`sticky-top ${!isSmallScreen && expand ? "expand" : ""}`}
      >
        <div className="d-flex mt-3">
          <button
            className="toggle-btn"
            type="button"
            onClick={toggle}
            disabled={isSmallScreen}
          >
            <i className="lni lni-grid-alt"></i>
          </button>
          <div className="sidebar-logo">
            <Link to="/">Scribbles</Link>
          </div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <NavLink to="/dashboard" className="sidebar-link">
              <i className="lni lni-home"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/addnote" className="sidebar-link">
              <i className="lni lni-plus"></i>
              <span>Add Note</span>
            </NavLink>
          </li>
        </ul>
        <div className="sidebar-footer pb-3">
          <Link to="/" className="sidebar-link" onClick={handleLogout}>
            <i className="lni lni-exit"></i>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
