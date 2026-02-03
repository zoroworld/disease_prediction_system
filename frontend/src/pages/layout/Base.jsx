import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useRef } from "react";

function Base({ children }) {
  const mainRef = useRef(null);
  return (
    <>
      <main class="dark-mode h-100" ref={mainRef} id="main">
        <div class="chat-container h-100">
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="col-md-2">
                <Sidebar />
              </div>
              <div className="col-md-10">
                <Header mainRef={mainRef} />
                <div class="chat-content">
                  {children}
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Base;
