import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout, darkMode, toggleDark } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm custom-navbar">
      <div className="container-fluid px-4">

        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Bellcorp
        </span>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center gap-3">

            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeMenu}>
                Events
              </NavLink>
            </li>

            {token && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard" onClick={closeMenu}>
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/create-event" onClick={closeMenu}>
                    Create Event
                  </NavLink>
                </li>

                <li className="nav-item">
                  <i
                    className="bi bi-person-circle fs-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
                  ></i>
                </li>
              </>
            )}

            <li className="nav-item">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={toggleDark}
              >
                {darkMode ? "Light" : "Dark"}
              </button>
            </li>

            {token && (
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Logout
                </button>
              </li>
            )}

            {!token && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="btn btn-sm btn-outline-primary"
                    to="/login"
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="btn btn-sm btn-primary"
                    to="/register"
                    onClick={closeMenu}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
