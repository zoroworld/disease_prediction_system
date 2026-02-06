import { createContext, useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { sendMessage as sendMessageApi } from "../api/chatApi";
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
  // parse medical report
  // =============================

  const parseMedicalReport = (reportString) => {
    if (!reportString) return null;

    try {
      const clean = reportString
        .replace(/```json|```/g, "")
        .trim();

      return JSON.parse(clean);
    } catch (err) {
      console.error("Invalid report JSON", err);
      return null;
    }
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
  const sendMessage = async () => {
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


    try {
      // 🔥 CALL BACKEND
      const data = await sendMessageApi(input);
      // const data = {
      //   "input_symptoms": "i have feaver and vomiting",
      //   "normalized_symptoms": "fever, vomiting",
      //   "predictions": [
      //     {
      //       "disease": "typhoid",
      //       "confidence": 0.15
      //     },
      //     {
      //       "disease": "dengue",
      //       "confidence": 0.14
      //     }
      //   ],
      //   "report": "```json\n{\n    \"overview\": \"The patient reports experiencing fever and vomiting.\",\n    \"description\": \"Fever, an elevated body temperature, is a common non-specific symptom often indicating an underlying infection or inflammatory process. Vomiting, the forceful expulsion of stomach contents, can be triggered by various factors including gastrointestinal infections, food poisoning, or systemic illnesses.\",\n    \"predictions\": [\n        {\n            \"disease\": \"typhoid\",\n            \"confidence\": 0.15,\n            \"recommendation\": \"Consult a doctor for diagnostic tests such as blood culture or Widal test, and appropriate antibiotic treatment if confirmed.\"\n        },\n        {\n            \"disease\": \"dengue\",\n            \"confidence\": 0.14,\n            \"recommendation\": \"Seek medical attention for diagnosis (e.g., NS1 antigen test, PCR) and supportive care, including fluid management and monitoring for warning signs.\"\n        }\n    ],\n    \"recommended_steps\": \"Given the presence of fever and vomiting, it is highly recommended to consult a healthcare professional promptly for a thorough evaluation, accurate diagnosis, and appropriate treatment plan. Stay hydrated by drinking plenty of fluids and avoid self-medication until a doctor's advice is received.\"\n}\n```"
      // }
      // console.log(data.data.report)

      // AI MESSAGE
      const medicalReport = parseMedicalReport(data.data.report);

      const aiMessage = medicalReport
        ? {
          id: id + 1,
          role: "ai",
          type: "medical_report",
          icon: <FontAwesomeIcon icon={faRobot} />,
          message: medicalReport,
        }
        : {
          id: id + 1,
          role: "ai",
          type: "text",
          icon: <FontAwesomeIcon icon={faRobot} />,
          message: { msg: "No prediction found" },
        };


      updateMessages(aiMessage);
      updateConversationStatus("completed");
      setShowPredictionModal(true);

    } catch (error) {
      console.error("Prediction failed:", error);

      const errorMessage = {
        id: id + 1,
        role: "ai",
        icon: <FontAwesomeIcon icon={faRobot} />,
        message: { msg: "Something went wrong 😢" },
      };

      updateMessages(errorMessage);
      updateConversationStatus("completed");
    }
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
