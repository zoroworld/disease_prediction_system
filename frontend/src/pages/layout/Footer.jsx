import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <>
      <div className="chat-footer">
        <div className="input-group">
          <textarea
            className="form-control"
            rows="1"
            placeholder="Type your message..."
          ></textarea>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Footer;
