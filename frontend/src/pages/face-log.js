import React, { Component } from "react";
import "./main.css";
import "./util.css";
import "./verify.css";
import Sketch from "react-p5";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./spinner.css";
const axios = require("axios");

let video;

const mystyle = {
  alignSelf: "center",
};

export class FaceLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: false,
      idenity: " ",
      pathn: "",
      loading: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 4000);
  }

  setup(p5 = "", canvasParentRef = "") {
    p5.noCanvas();
    video = p5.createCapture(p5.VIDEO);
    const v = document.querySelector("video");
    let st = "position: absolute; top: 220px;";
    v.setAttribute("style", st);
  }

  stop() {
    const tracks = document.querySelector("video").srcObject.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });
  }

  setup2() {
    const button = document.getElementById("submit");
    button.addEventListener("click", async (event) => {
      video.loadPixels();
      const image64 = video.canvas.toDataURL();

      const response = await axios.post("http://localhost:5000/verify", {
        image64: image64,
        username: this.state.username,
      });

      if (response.status === 200) {
        this.stop();

        const rolee = await axios.get(
          "http://localhost:8080/users/usern-role/" + response.data.username
        );

        AuthService.loginface(response.data.username).then((response) => {
          if (rolee.data === "doctor") {
            localStorage.setItem("role", "doctor");
            this.setState({
              pathn: "/doctor/app",
            });
          } else if (rolee.data === "patient") {
            localStorage.setItem("role", "patient");
            this.setState({
              pathn: "/patient/app",
            });
          }
        });

        this.setState({
          verify: true,
          idenity: response.data.username,
        });
      } else {
        this.stop();
        Swal.fire({
          title: "Not a registered user",
          text: "Try Again",
          icon: "warning",
        });
      }
    });
  }

  render() {
    let verify = (
      <div>
        <Navbar />
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
              <span
                className="login100-form-title p-b-53"
                style={{ color: "#009efb" }}
              >
                Log in with Face ID
              </span>

              <input />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />

              <Sketch setup={this.setup} draw={this.draw} />

              <div className="container-login100-form-btn m-t-17">
                <button
                  id="submit"
                  onClick={this.setup2.bind(this)}
                  className="login100-form-btn"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <div id="dropDownSelect1"></div>
      </div>
    );

    return (
      <div>
        {this.state.verify ? (
          <Navigate to={this.state.pathn} replace={true} />
        ) : (
          verify
        )}
        <div className="main-wrapper account-wrapper">
          <div className="account-page">
            <div className="account-center">
              <br />
              <br /> <br />
              <br />
              <br />
              <br />
              <div className="account-box" style={{ width: "900px" }}>
                <div className="account-logo" style={{ width: "900px" }}>
                  <div class="loader" style={mystyle}></div>
                  <br />
                  <br />
                  <br />
                  <p style={{ fontSize: "20px", color: "black" }}>
                    Verifying Identity
                  </p>
                  <br />
                  <br />
                  <br />
                </div>
                <div className="col-sm-12 text-center m-t-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FaceLog;
