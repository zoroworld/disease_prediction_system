import React from "react";
import ButtonLink from "../component/ButtonLink";
import symptom1 from '../assets/images/symptom_1.png';
import symptom2 from '../assets/images/symptom_2.png';
import symptom3 from '../assets/images/symptom_3.png';
import symptom4 from '../assets/images/symptom_4.png';
import symptom5 from '../assets/images/symptom_5.png';


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
            <ButtonLink data={{ name: "Get Started", link: "/login" }} />
          </div>

          <div className="landing-orbit">
            <div className="orbit-container">
              <div className="symptom">
                <img
                  src={symptom1}
                  alt="Fever"
                  className="rounded-circle img-fluid"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />

              </div>
              <div className="symptom">
                <img
                  src={symptom2}
                  alt="Fatigue"
                  className="rounded-circle img-fluid"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </div>
              <div className="symptom">
                <img
                  src={symptom3}
                  alt="Nausea"
                  className="rounded-circle img-fluid"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </div>
              <div className="symptom">
                <img
                  src={symptom4}
                  alt="Cough"
                  className="rounded-circle img-fluid"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </div>
              <div className="symptom">
                <img
                  src={symptom5}
                  alt="Headache"
                  className="rounded-circle img-fluid"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
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
