import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUser } from "@fortawesome/free-solid-svg-icons";

function Header({mainRef}) {
  function handletoggleTheme() {
    mainRef.current.classList.toggle("dark-mode");
  }
  return (
    <>
      <div className="chat-header d-flex justify-content-between align-items-center">
        <strong>MARKED</strong>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handletoggleTheme}
          >
            <FontAwesomeIcon icon={faMoon} className="ms-2" />
          </button>

          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <FontAwesomeIcon icon={faUser} className="ms-2" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Login
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Register
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
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
