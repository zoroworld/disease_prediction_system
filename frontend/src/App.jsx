import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/css/style.css";
import "./assets/css/auth.css";
import { Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Base from "./pages/layout/Base";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Base>
                <Chat />
              </Base>
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
