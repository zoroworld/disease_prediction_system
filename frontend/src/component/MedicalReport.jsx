import React from "react";
import Typewriter from "typewriter-effect";

const MedicalReport = ({ report }) => {
  if (!report) return null;

  // Flatten report into a string for Typewriter
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
    .join("\n")}

✅ Recommended Steps
${report.recommended_steps}

⚠️ Disclaimer
This is not a final diagnosis. Please consult a qualified doctor.
`;

  return (
    <article className="medical-report">
      <Typewriter
        options={{
          delay: 20,
          cursor: "|",
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(reportString.replace(/\n/g, "<br/>"))
            .start();
        }}
      />
    </article>
  );
};

export default MedicalReport;
