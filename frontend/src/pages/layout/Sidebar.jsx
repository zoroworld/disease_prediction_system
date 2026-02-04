import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useChat } from "../../context/ChatContext";

const Sidebar = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewPrediction,
    deleteConversation,
  } = useChat();

  return (
    <div className="sidebar p-3 h-100">
      <h6 className="mb-3">Conversations</h6>

      {/*  New Chat */}
      <button
        className="btn btn-success w-100 mb-3"
        onClick={createNewPrediction}
      >
        <span>New Prediction</span>{" "}
        <FontAwesomeIcon icon={faPlus} className="ms-2" />
      </button>

      {/*  Chat List */}
      <div className="conversation-list">
        {conversations.map((conv) => {
          const isActive = conv.id === activeConversationId;
          return (
            <div
              key={conv.id}
              className={`chat-item d-flex justify-content-between align-items-center p-2 mb-2 rounded ${
                isActive ? "bg-primary text-white" : ""
              }`}
            >
              {/* Conversation Title */}
              <div
                className="flex-grow-1"
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                onClick={() => setActiveConversationId(conv.id)}
              >
                <FontAwesomeIcon icon={faMessage} className="me-2" />
                {conv.title}
              </div>

              {/* Delete Button */}
              <FontAwesomeIcon
                icon={faTrash}
                style={{ cursor: "pointer" }}
                onClick={() => deleteConversation(conv.id)}
                title="Delete Conversation"
              />
            </div>
          );
        })}

        {conversations.length === 0 && (
          <p className="text-white mt-2">No conversations yet</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
