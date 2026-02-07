import { createContext, useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { sendMessage as sendMessageApi } from "../api/chatApi";
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [input, setInput] = useState("");
  // const [chatStatus, setChatStatus] = useState("ready");
  const [hasSearched, setHasSearched] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))



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
    if (!user) return;

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
      // CALL BACKEND

      const input_data = {
        symptoms: input,
        user_id: user
      }

      // const data = await sendMessageApi(input_data);
      const data = {
        data: {
          "input_symptoms": "fever headache body pain",
          "normalized_symptoms": "fever, headache, myalgia",
          "predictions": [
            {
              "disease": "hypertension",
              "confidence": 0.14
            },
            {
              "disease": "dengue",
              "confidence": 0.13
            }
          ],
          "report": "```json\n{\n    \"overview\": \"The patient reports experiencing acute onset of fever, headache, and generalized body pain (myalgia).\",\n    \"description\": \"These symptoms are common indicators of a systemic inflammatory response, often associated with viral infections such as the common cold, influenza, or other febrile illnesses. Fever is the body's natural response to infection, while headache and myalgia frequently accompany it, resulting from inflammation and the immune system's activity. Given the combination, infectious diseases are a primary consideration.\",\n    \"predictions\": [\n        {\n            \"disease\": \"hypertension\",\n            \"confidence\": 0.14,\n            \"recommendation\": \"While the model identified hypertension, acute symptoms like fever and widespread body pain are generally not typical presentations of hypertension itself, though severe headaches can sometimes be associated with hypertensive crises. Further investigation for hypertension would usually involve blood pressure monitoring over time, separate from the acute febrile illness.\"\n        },\n        {\n            \"disease\": \"dengue\",\n            \"confidence\": 0.13,\n            \"recommendation\": \"Dengue fever is a significant possibility given the reported symptoms (fever, headache, and severe body pain, often described as 'breakbone fever'). This diagnosis is particularly relevant in endemic regions and requires prompt medical evaluation, including specific diagnostic tests, to confirm and manage appropriately.\"\n        }\n    ],\n    \"recommended_steps\": [\n        \"Monitor symptoms closely: Keep track of fever levels, severity of headache and body pain, and note any new symptoms like rashes, nausea, vomiting, or bleeding.\",\n        \"Rest and Hydration: Ensure adequate rest and maintain good hydration by drinking plenty of fluids (water, clear broths, oral rehydration solutions).\",\n        \"Pain and Fever Management: Over-the-counter medications like paracetamol (acetaminophen) can help manage fever and body pain. Avoid NSAIDs (like ibuprofen or aspirin) without medical advice, especially if dengue is suspected, due to potential bleeding risks.\",\n        \"Seek Medical Consultation: It is highly recommended to see a doctor for a proper diagnosis, especially given the fever and body pain, which could indicate an infection like dengue or influenza. A medical professional can conduct a physical examination, order necessary diagnostic tests (e.g., blood tests for dengue or other viral infections), and provide appropriate treatment or management advice.\",\n        \"Emergency Care: Seek immediate medical attention if symptoms worsen significantly, including very high fever, severe abdominal pain, persistent vomiting, bleeding from any part of the body, difficulty breathing, or extreme weakness.\"\n    ]\n}\n```"
        }
      }

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
