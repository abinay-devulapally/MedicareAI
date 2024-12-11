import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Team() {
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
      <section className="home-slider owl-carousel">
        <div
          className="slider-item bread-item"
          style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
          data-stellar-background-ratio="0.5"
        >
          <div className="overlay" />
          <div className="container" data-scrollax-parent="true">
            <div className="row slider-text align-items-end">
              <div className="col-md-7 col-sm-12 ftco-animate mb-5">
                <p className="breadcrumbs">
                  <span className="mr-2">
                    <a href="/">Home</a>
                  </span>{" "}
                  <span>Team</span>
                </p>
                <h1 className="mb-3 navbar-brand">
                  Meet the <span style={{ fontWeight: "bold" }}>Medicare</span>
                  <span style={{ color: "blue", fontWeight: "bold" }}>
                    AI
                  </span>{" "}
                  Team
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-5">
            <div className="col-md-7 text-center heading-section ftco-animate">
              <h2 className="mb-3">About Medicare AI</h2>
              <p>
                Medicare AI is a cutting-edge platform leveraging artificial
                intelligence to simplify healthcare operations. From automated
                scheduling to intelligent symptom detection, it empowers
                healthcare providers and enhances patient experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Team;
