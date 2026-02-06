import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";


function Header({ mainRef }) {
  const { logout } = useAuth();
  const [name, setName] = useState('user');

  // Initialize mode from localStorage
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved !== null ? saved : "dark-mode";
  });

  useEffect(() => {
    if (!mainRef.current) return;

    if (mode === "dark-mode") {
      mainRef.current.classList.add("dark-mode");
    } else {
      mainRef.current.classList.remove("dark-mode");
    }
  }, [mode]);

  const handleToggleTheme = () => {
    setMode(prev => {
      const next = prev === "dark-mode" ? "" : "dark-mode";
      localStorage.setItem("theme", next);
      return next;
    });
  };



  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-data"))
    setName(user.username)
  }, [])



  return (
    <>
      <div className="chat-header d-flex justify-content-between align-items-center">
        <strong>MARKED</strong>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleToggleTheme}
          >
            <FontAwesomeIcon icon={faMoon} className="ms-2" />
          </button>

          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              {name}
              <FontAwesomeIcon icon={faUser} className="ms-2" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {/* <li>
                <a className="dropdown-item" href="#">
                  Login
                </a>
              </li> */}
              <li>
                <a className="dropdown-item" href="#">
                  setting
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
