import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useChat } from "../../context/ChatContext";

function Footer() {
  const { input, setInput, sendMessage, activeConversationId, chatStatus } = useChat();
  const isDisabled = !activeConversationId || chatStatus !== "ready";

  // Handle typing
  const handleInputMessage = (e) => {
    setInput(e.target.value);
  };

  // Handle Enter press
  const handleInputEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Stop newline
      sendMessage();
    }
  };

  return (
    <div className="chat-footer">
      {(chatStatus === "completed" || !activeConversationId) ? (
        <div
          className="alert alert-warning d-flex align-items-center justify-content-center w-100"
          role="alert"
          style={{ gap: "10px", fontWeight: "500" }}
        >
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {!activeConversationId ? 'Create a new prediction.' : 'Prediction completed. Create a new prediction.'}
        </div>
      ) : (
        <div className="input-group">
          <textarea
            className="form-control"
            rows="1"
            name="symptoms"
            value={input}
            disabled={isDisabled || !activeConversationId}
            placeholder={
              !activeConversationId
                ? "No conversation. Create a new prediction."
                : "Enter symptoms..."
            }
            onChange={handleInputMessage}
            onKeyDown={handleInputEnter}
          />
          <button
            className="btn btn-primary"
            onClick={sendMessage}
            disabled={isDisabled || !activeConversationId}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Footer;
