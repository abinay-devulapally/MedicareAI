/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/style-prop-object */
import Footer from "../components/footer";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

function Role() {
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
  const patienthandler = (e) => {
    window.location.href = "/face-reg";
    window.localStorage.setItem("role", "patient");
  };
  const doctorhandler = (e) => {
    window.location.href = "/verification";
    window.localStorage.setItem("role", "doctor");
  };
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
                <p
                  className="breadcrumbs"
                  data-scrollax=" properties: { translateY: '70%', opacity: 1.6}"
                >
                  <span className="mr-2">
                    <a href="index.html">Home</a>
                  </span>{" "}
                  <span>Sign Up</span>
                </p>
                <h1
                  className="mb-3 navbar-brand"
                  data-scrollax=" properties: { translateY: '70%', opacity: .9}"
                >
                  Sign Up In <span style={{ fontWeight: "bold" }}>Nearest</span>
                  <span style={{ color: "#009efb", fontWeight: "bold" }}>
                    Doctor
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center heading-section ftco-animate">
              <h2>Sign Up</h2>
              Already have an account ? &nbsp;
              <Link
                className="nav-link"
                underline="none"
                variant="subtitle2"
                component={Link}
                to="/login"
              >
                <p className="button text-center">
                  <span>Sign In</span>
                </p>
              </Link>
              <div className="row no-gutters justify-content-center">
                <div className="col-md-6 col-sm-8 color-3 p-3">
                  {" "}
                  {/* Adjusted column size */}
                  <div>
                    <div className="ftco-animate">
                      <div className="pricing-entry text-center">
                        <a
                          className="gallery img d-flex align-items-center"
                          style={{
                            backgroundImage: "url(images/patient.jpg)",
                            height: "200px" /* Adjusted image height */,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></a>
                        <div className="img-overlay">
                          <button className="role-button text-center cta">
                            PATIENT
                          </button>
                        </div>
                        <button className="nav-link" onClick={patienthandler}>
                          <p className="button text-center">
                            <a className="btn btn-primary btn-outline-primary px-3 py-2">
                              <span>Sign Up</span>
                            </a>
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="container">
                    <div className="row justify-content-center"></div>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        <div className="pricing-entry text-center">
                          <div>
                            <h3
                              className="mb-4"
                              style={{
                                color: "#009efb",
                                fontSize: "18px" /* Reduced font size */,
                                fontWeight: "bold",
                              }}
                            >
                              Features
                            </h3>
                          </div>
                          <ul style={{ fontSize: "14px" }}>
                            {" "}
                            {/* Reduced text size */}
                            <li>
                              <span className="icon-check"></span> Specialist
                              Recommendation
                            </li>
                            <li>
                              <span className="icon-check"></span> Appointment
                              with the nearest doctor
                            </li>
                            <li>
                              <span className="icon-check"></span> Well-secured
                              medical records
                            </li>
                            <li>
                              <span className="icon-check"></span> Mental health
                              test with results
                            </li>
                            <li>
                              <span className="icon-check"></span> Engaging
                              chatbot health assistant
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
export default Role;
