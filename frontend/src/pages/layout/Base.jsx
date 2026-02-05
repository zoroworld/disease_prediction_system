import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import { ChatProvider } from "../../context/ChatContext";
// import PredictionModal from "../../component/PredictionModal"

function Base({ children }) {
  const mainRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const { getUserById } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById();
        setUserData(res);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <main className="dark-mode h-100" ref={mainRef} id="main">
        <ChatProvider>
          <div className="chat-container h-100">
            <div className="container-fluid h-100">
              <div className="row h-100">
                <div className="col-md-2">
                  <Sidebar />
                </div>
                <div className="col-md-10">
                  <Header mainRef={mainRef} userData={userData}/>
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
