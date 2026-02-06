const MedicalReport = ({ report }) => {
    return (
      <article className="medical-report">
        <section>
          <h4>🩺 Overview</h4>
          <p>{report.overview}</p>
        </section>
  
        <section>
          <h4>📋 Description</h4>
          <p>{report.description}</p>
        </section>
  
        <section>
          <h4>🧪 Possible Conditions</h4>
          <ul>
            {report.predictions.map((p, i) => (
              <li key={i}>
                <strong>{p.disease}</strong>{" "}
                <span>({Math.round(p.confidence * 100)}%)</span>
                <p>{p.recommendation}</p>
              </li>
            ))}
          </ul>
        </section>
  
        <section>
          <h4>✅ Recommended Steps</h4>
          <p>{report.recommended_steps}</p>
        </section>
      </article>
    );
  };
  
  export default MedicalReport;
  