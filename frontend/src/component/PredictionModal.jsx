import { useChat } from "../context/ChatContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const PredictionModal = () => {
  const { showPredictionModal, createNewPrediction, setShowPredictionModal } = useChat();

  if (!showPredictionModal) return null;

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop-custom")) {
      setShowPredictionModal(false);
    }
  };

  // Close modal and create new prediction
  const handleCreateNew = () => {
    createNewPrediction();
    setShowPredictionModal(false);
  };

  return (
    <div className="modal-backdrop-custom" onClick={handleBackdropClick}>
      <div className="modal-box" style={{position: "relative"}}>
        {/* Close button */}
        <button
          className="btn-close"
          style={{ position: "absolute", top: "15px", right: "15px", border: "none", background: "transparent" }}
          onClick={() => setShowPredictionModal(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Success icon */}
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ fontSize: "40px", color: "#19c37d", marginBottom: "15px" }}
        />

        <h5>Prediction Completed</h5>

        <p>
          Your prediction has been successfully generated. Start a new
          prediction to continue.
        </p>

        <button className="btn btn-success w-100 mt-2" onClick={handleCreateNew}>
          Create New Prediction
        </button>
      </div>
    </div>
  );
};

export default PredictionModal;
