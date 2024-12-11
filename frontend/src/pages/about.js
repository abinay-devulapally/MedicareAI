import "./About.css";

// assets imports
import aboutImg from "../assets/about1.jpg";

const About = () => {
  return (
    <div className="about__container d-flex flex-column align-items-center justify-content-center">
      <div className="about__sectionHeading d-flex flex-column align-items-center justify-content-cente">
        <p className="my-0">What We Do ?</p>
        <div className="about__borderDiv"></div>
      </div>
      <div className="about__containerDiv">
        <div className="about__infoContainer">
          <div className="about__infoTextHeading">
            <p>About MedicareAI</p>
          </div>
          <div className="about__infoTextPara">
            <p>
              "MedicareAI" is a comprehensive AI-driven healthcare platform
              designed to enhance patient care by integrating AI, machine
              learning, and Generative AI technologies. The platform enables
              users to schedule appointments with doctors based on availability,
              ask symptom-related questions, and receive real-time responses
              from a chatbot powered by advanced AI models. Patients can easily
              find the nearest healthcare providers and get personalized medical
              assistance through the system. In addition, MedicareAI leverages
              AI for symptom detection and mental health screening, providing
              timely support and improving patient engagement.
            </p>
          </div>
        </div>
        <div className="about__imgContainer text-center">
          <div className="about__imgDiv">
            <img src={aboutImg} alt="about Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
