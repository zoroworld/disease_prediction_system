import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { useChat } from "../../context/ChatContext";

function Footer() {
  const { input, setInput, sendMessage } = useChat()

  function handleInputMessage(e){
    let value = e.target.value
    setInput(value)
  }

  return (
    <>
      <div className="chat-footer">
        <div className="input-group">
          <textarea
            className="form-control"
            rows="1"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputMessage}
          ></textarea>
          <button className="btn btn-primary" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Footer;
