import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import MedicalReport from "../component/MedicalReport";


import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  const { messages, hasSearched } = useContext(ChatContext);
  const bottomRef = useRef(null);


  //  Store IDs of AI messages that have been typed
  const typedMessagesRef = useRef(new Set());

  // Auto scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  return (
    <>
      {(!hasSearched || !messages || messages.length === 0) ? (
        <div className="chat-initil-body">
          <div className="chat-initil-card">
            <div className="docter-bot-icon">
              <FontAwesomeIcon icon={faRobot} />
            </div>
            <div className="description">
              <p>
                Welcome! Enter your symptoms in the search bar below and let me
                help you with a prediction.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-body">
          {messages.map((item) => {
            const isText = item.type === "text";
            const isMedical = item.type === "medical_report";
            const isAI = item.role === "ai";

            const hasTyped = typedMessagesRef.current.has(item.id);

            // If AI message hasn't been typed yet → use Typewriter
            const showTypewriter = isAI && !hasTyped;

            return (
              <div key={item.id} className={`message ${item.role}`}>
                <div className="icon">{item.icon}</div>

                <div className="content">
                  {showTypewriter ? (
                    <Typewriter
                      options={{ cursor: "|", delay: 35, deleteSpeed: Infinity }}
                      onInit={(typewriter) => {
                        // Scroll continuously while typing
                        const interval = setInterval(() => {
                          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
                        }, 10);

                        typewriter
                          .typeString(item.message.msg)
                          .callFunction(() => {
                            typedMessagesRef.current.add(item.id);
                            clearInterval(interval); // stop continuous scroll
                            bottomRef.current?.scrollIntoView({ behavior: "smooth" }); // final scroll
                          })
                          .start();
                      }}
                    />

                  ) : (
                    item.message.msg
                  )}
                  {isMedical && (
                    <>
                      <p>
                        Based on the symptoms you described, here is a preliminary medical
                        assessment:
                      </p>

                      <MedicalReport
                        report={item.message}
                        onComplete={() =>
                          bottomRef.current?.scrollIntoView({ behavior: "smooth" })
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
      )}
    </>
  );
};

export default Chat;
