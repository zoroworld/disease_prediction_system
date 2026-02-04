import { createContext, useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [input, setInput] = useState("");
  // const [chatStatus, setChatStatus] = useState("ready");
  const [hasSearched, setHasSearched] = useState(false);


  const [showPredictionModal, setShowPredictionModal] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const hasInitialized = useRef(false);

  // =============================
  // CREATE NEW CHAT
  // =============================
  const createNewPrediction = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Prediction",
      status: "ready", // store per chat
      messages: [],
    };

    setConversations((prev) => [...prev, newConversation]);
    setActiveConversationId(newConversation.id);
    setShowPredictionModal(false);
  };

  // =============================
  // AUTO CREATE FIRST CHAT
  // =============================
  useEffect(() => {
    if (!hasInitialized.current) {
      createNewPrediction();
      hasInitialized.current = true;
    }
  }, []);

  // =============================
  // ACTIVE CHAT
  // =============================
  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const chatStatus = activeConversation?.status || "ready";

  const messages = activeConversation?.messages || [];

  // =============================
  // ADD MESSAGE
  // =============================
  const updateMessages = (newMsg) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, newMsg] }
          : conv
      )
    );
  };

  // =============================
  // UPDATE TITLE
  // =============================
  const updateConversationTitle = (text) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, title: text.slice(0, 25) }
          : conv
      )
    );
  };

  const updateConversationStatus = (status) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId ? { ...conv, status } : conv
      )
    );
  };

  // =============================
  // DELETE CHAT
  // =============================
  const deleteConversation = (conversationId) => {
    setConversations((prev) => {
      const updated = prev.filter((c) => c.id !== conversationId);

      //  If deleted chat was active
      if (conversationId === activeConversationId) {
        if (updated.length > 0) {
          setActiveConversationId(updated[0].id);
        } else {
          setActiveConversationId(null); // IMPORTANT
        }
      }

      return updated;
    });
  };

  // =============================
  // SEND MESSAGE
  // =============================
  const sendMessage = () => {
    if (!input.trim()) return;
    if (chatStatus === "completed") return;
    if (!activeConversationId) return;

    const id = Date.now();

    const userMessage = {
      id,
      role: "user",
      icon: <FontAwesomeIcon icon={faUser} />,
      message: { msg: input },
    };

    updateMessages(userMessage);
    updateConversationTitle(input);

    setInput("");
    // setChatStatus("predicting");
    updateConversationStatus("predicting");
    setHasSearched(true);

    setTimeout(() => {
      const aiMessage = {
        id: id + 1,
        role: "ai",
        icon: <FontAwesomeIcon icon={faRobot} />,
        message: { msg: "This is Docter AI response 🤖" },
      };

      updateMessages(aiMessage);

      // setChatStatus("completed");
      updateConversationStatus("completed");
      setShowPredictionModal(true);
    }, 1500);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        setActiveConversationId,
        messages,
        input,
        setInput,
        sendMessage,
        createNewPrediction,
        deleteConversation,
        chatStatus,
        showPredictionModal,
        setShowPredictionModal,
        hasSearched,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
