import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  return (
    <>
      <div className="chat-body">
        <div className="message ai">
          <div className="icon">
            <FontAwesomeIcon icon={faRobot} className="ms-2" />
          </div>
          <div className="content">Hello 👋 How can I help you today?</div>
        </div>

        <div className="message human">
          <div className="icon">
            <FontAwesomeIcon icon={faUser} className="ms-2" />
          </div>
          <div className="content">
            Build a ChatGPT UI with sidebar and dark mode.
          </div>
        </div>

        <div className="message ai">
          <div className="icon">
            <FontAwesomeIcon icon={faRobot} className="ms-2" />
          </div>
          <div className="content">
            You're looking at a complete template already 🚀
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
