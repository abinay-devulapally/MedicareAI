import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect } from "react";
import Categories from "./Categories";
import About from "./about";
import Problems from "./Problem";
import team1 from "../assets/ahlem.jpg";
function Home() {
  const loadScript = (src) => {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", function () {
        resolve();
      });
      script.addEventListener("error", function (e) {
        reject(e);
      });
      document.body.appendChild(script);
      document.body.removeChild(script);
    });
  };

  useEffect(() => {
    loadScript(`${process.env.PUBLIC_URL}js/main.js`);
  });
  return (
    <div>
      <Navbar />

      <div>
        {/* END nav */}
        <section className="home-slider owl-carousel">
          <div
            className="slider-item"
            style={{ backgroundImage: 'url("images/medicare_bg1.jpg")' }}
          >
            <div className="overlay" />
            <div className="container">
              <div
                className="row slider-text align-items-center"
                data-scrollax-parent="true"
              >
                <div
                  className="col-md-6 col-sm-12 ftco-animate"
                  data-scrollax=" properties: { translateY: '70%' }"
                >
                  <h1
                    className="mb-4"
                    data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
                  >
                    MedicareAI
                  </h1>
                  <p
                    className="mb-4"
                    data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
                  >
                    Welcome to MedicareAI ,your smart healthcare companion.
                    Instantly book appointments, chat with our AI for symptom
                    checks, and access mental health tools. Experience fast,
                    personalized care, anytime, anywhere.
                  </p>
                  <p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">
                    <a
                      href="/patient/take-appointment"
                      className="btn btn-primary px-4 py-3"
                    >
                      Make an Appointment
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="slider-item"
            style={{ backgroundImage: 'url("images/medicare_bg2.jpg")' }}
          >
            <div className="overlay" />
            <div className="container">
              <div
                className="row slider-text align-items-center"
                data-scrollax-parent="true"
              >
                <div
                  className="col-md-6 col-sm-12 ftco-animate"
                  data-scrollax=" properties: { translateY: '70%' }"
                >
                  <h1
                    className="mb-4"
                    data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
                  >
                    MedicareAI
                  </h1>
                  <p className="mb-4">Your health in one click.</p>
                  <p>
                    <a
                      href="/patient/take-appointment"
                      className="btn btn-primary px-4 py-3"
                    >
                      Make an Appointment
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <About />
        <Categories />
        <Problems />

        <Footer />
        {/* loader */}
      </div>
    </div>
  );
}
export default Home;
