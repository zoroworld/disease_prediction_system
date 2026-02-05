import React from "react";
import ButtonLink from "../component/ButtonLink";

function Index() {
  return (
    <>
      <main className="main-landing-page">
        <div className="landing-container">
          <div className="landing-text">
            <div className="landing-title">Disease Prediction System</div>
            <div className="landing-desc">
              Enter your symptoms and let our intelligent system predict
              possible diseases.
            </div>
            <ButtonLink data={{ name: "Get Started", link: "/chat" }} />
            {/* <ButtonLink data={{ name: "Get Started", link: "/login" }} /> */}
          </div>

          <div className="landing-orbit">
            <div className="orbit-container">
              <div className="symptom">
                <img
                  src="https://img.icons8.com/fluency/96/fever.png"
                  alt="Fever"
                />
              </div>
              <div className="symptom">
                <img
                  src="https://img.icons8.com/fluency/96/headache.png"
                  alt="Headache"
                />
              </div>
              <div className="symptom">
                <img
                  src="https://img.icons8.com/fluency/96/cough.png"
                  alt="Cough"
                />
              </div>
              <div className="symptom">
                <img
                  src="https://img.icons8.com/fluency/96/nausea.png"
                  alt="Nausea"
                />
              </div>
              <div className="symptom">
                <img
                  src="https://img.icons8.com/fluency/96/fatigue.png"
                  alt="Fatigue"
                />
              </div>
            </div>

            <div className="landing-image">
              <img
                src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=740&t=st=1679658586~exp=1679659186~hmac=1e472f2f38bfc4f2cc637b5d6b07e69c3d680f1aa6d8da5f2f1cce0fc1fda299"
                alt="Doctor"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Index;
