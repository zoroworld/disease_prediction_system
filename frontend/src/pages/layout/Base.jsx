import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import { ChatProvider } from "../../context/ChatContext";
// import PredictionModal from "../../component/PredictionModal"

function Base({ children }) {
  const mainRef = useRef(null);

  return (
    <>
      <main className="main-chat-container dark-mode h-100" ref={mainRef} id="main">
        <ChatProvider>
          <div className="chat-container h-100">
            <div className="container-fluid h-100">
              <div className="row h-100">
                <div className="col-md-2">
                  <Sidebar />
                </div>
                <div className="col-md-10 h-100">
                  <Header mainRef={mainRef}/>
                  <div className="chat-content">
                    {children}
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ChatProvider>
      </main>
    </>
  );
}

export default Base;
