import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPlus } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar p-3 h-100">
        <h6 className="mb-3">Conversations</h6>

        <div className="chat-item bg-primary d-flex align-items-center justify-content-between">
          <div>
            <FontAwesomeIcon icon={faMessage} className="ms-2" />
             New Chat
          </div>
          <FontAwesomeIcon icon={faPlus} className="ms-2" />
        </div>
        <div className="chat-item d-flex align-items-center">
          <FontAwesomeIcon icon={faMessage} className="ms-2" />
           ML Project Help
        </div>
        <div className="chat-item d-flex align-items-center">
          <FontAwesomeIcon icon={faMessage} className="ms-2" />  API Debugging
        </div>
      </div>
    </>
  );
};

export default Sidebar;
