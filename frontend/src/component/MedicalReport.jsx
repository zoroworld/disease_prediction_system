import React from "react";
import Typewriter from "typewriter-effect";

const MedicalReport = ({ report, onComplete }) => {
  if (!report) return null;

  // Convert recommended steps array into numbered list
  const steps = report.recommended_steps
    .map((step, i) => `${i + 1}. ${step}`)
    .join("\n");

  // Flatten report into a string
  const reportString = `
🩺 Overview
${report.overview}

📋 Description
${report.description}

🧪 Possible Conditions
${report.predictions
      .map(
        (p) =>
          `- ${p.disease} (${Math.round(p.confidence * 100)}%)
Recommendation: ${p.recommendation}`
      )
      .join("\n\n")}

✅ Recommended Steps
${steps}

⚠️ Disclaimer
This is not a final diagnosis. Please consult a qualified doctor.
`;

  return (
    <article className="medical-report" style={{ whiteSpace: "pre-wrap" }}>
      <Typewriter
        options={{ delay: 20, cursor: "|" }}
        onInit={(typewriter) => {
          const interval = setInterval(() => {
            onComplete?.(); // scroll continuously
          }, 10);

          typewriter
            .typeString(reportString)
            .callFunction(() => {
              clearInterval(interval); // stop scrolling
              onComplete?.(); // final scroll
            })
            .start();
        }}
      />

    </article>
  );
};

export default MedicalReport;
