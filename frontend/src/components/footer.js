import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="ftco-footer ftco-bg-dark ftco-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">MedicareAI</h2>
              <p>
                MedicareAI is an advanced AI healthcare assistant offering
                medical services to patients and doctors. It utilizes chatbots
                for seamless interaction, blockchain for secure medical report
                storage, and machine learning for accurate illness detection.
              </p>
            </div>
            <ul className="ftco-footer-social list-unstyled float-md-left float-lft">
              <li className="ftco-animate">
                <a href="https://www.linkedin.com/company/medicareai/">
                  <span className="icon-linkedin" />
                </a>
              </li>
              <li className="ftco-animate">
                <a href="mailto:medicareai.reply@gmail.com">
                  <span className="icon-google" />
                </a>
              </li>
              <li className="ftco-animate">
                <a href="https://github.com/ahlem-phantom/AI-HealthCare-Assistant">
                  <span className="icon-github" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <div className="ftco-footer-widget mb-4 ml-md-5">
              <h2 className="ftco-heading-2">Quick Links</h2>
              <ul className="list-unstyled">
                <li>
                  <Link
                    className="py-2 d-block"
                    underline="none"
                    variant="subtitle2"
                    component={Link}
                    to="/"
                  >
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 d-block"
                    underline="none"
                    variant="subtitle2"
                    component={Link}
                    to="/contact"
                  >
                    <span>Contact</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 d-block"
                    underline="none"
                    variant="subtitle2"
                    component={Link}
                    to="/"
                  >
                    <span>Team</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="py-2 d-block"
                    underline="none"
                    variant="subtitle2"
                    component={Link}
                    to="/shop"
                  >
                    <span>Shop</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Office</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <span className="icon icon-map-marker" />
                    <span className="text">
                      University of Cincinnati, Cincinnati, Ohio, 45220, United
                      States
                    </span>
                  </li>
                  <li>
                    <a href="mailto:medicareai.reply@gmail.com">
                      <span className="icon icon-envelope" />
                      <span className="text">medicareai.reply@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
