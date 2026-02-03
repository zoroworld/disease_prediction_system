import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/css/style.css";
import { Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Base from "./pages/layout/Base";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route
          path="/chat"
          element={
            <Base>
              <Chat />
            </Base>
          }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
