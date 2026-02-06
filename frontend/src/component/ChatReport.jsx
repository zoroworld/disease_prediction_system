import BotMessage from "./BotMessage";
import MedicalReport from "./MedicalReport";

export default function Chat() {
  const report = {
    overview: "The patient reports experiencing fever and vomiting.",
    description:
      "Fever is an elevated body temperature often indicating infection. Vomiting can be caused by gastrointestinal or systemic illness.",
    predictions: [
      {
        disease: "Typhoid",
        confidence: 0.15,
        recommendation:
          "Consult a doctor for diagnostic tests such as blood culture or Widal test."
      },
      {
        disease: "Dengue",
        confidence: 0.14,
        recommendation:
          "Seek medical attention for NS1 antigen or PCR testing and supportive care."
      }
    ],
    recommended_steps:
      "Consult a healthcare professional promptly. Maintain hydration and avoid self-medication."
  };

  return (
    <div className="chat-window">
      <BotMessage>
        <p>
          Based on the symptoms you described, here is a preliminary medical
          assessment:
        </p>

        <MedicalReport report={report} />

        <p className="disclaimer">
          ⚠️ This is not a final diagnosis. Please consult a qualified doctor.
        </p>
      </BotMessage>
    </div>
  );
}
