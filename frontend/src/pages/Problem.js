import "./Problem.css";
import Problem1 from "../assets/problem1.jpg";
import Problem2 from "../assets/problem2.png";
import Problem3 from "../assets/problem3.jpeg";
import Problem4 from "../assets/problem4.png";
import Problem5 from "../assets/problem5.png";
import Problem6 from "../assets/problem6.png";
import Problem7 from "../assets/problem7.jpeg";

const Problem = () => {
  const cardData = [
    {
      imgSrc: Problem1,
      title: "Early Detection",
      description:
        "Detect issues early and provide actionable recommendations, precautions, and best practices to ensure timely care.",
    },
    {
      imgSrc: Problem6,
      title: "User History",
      description:
        "Access all your previous chest X-ray test reports in one place, making it easier to track your health over time.",
      imgHeight: "200px",
    },
    {
      imgSrc: Problem3,
      title: "Ease of Access",
      description:
        "A platform that’s readily available to patients worldwide—just a click away, anytime, anywhere.",
    },
    {
      imgSrc: Problem4,
      title: "Decentralized and Secure",
      description:
        "Enjoy peace of mind with your data stored securely on blockchain, ensuring it’s immutable and always accessible.",
      imgHeight: "200px",
    },
    {
      imgSrc: Problem7,
      title: "Further Help",
      description:
        "Receive expert-recommended precautions and safety measures to enhance your healthcare journey.",
    },
    {
      imgSrc: Problem5,
      title: "Multilayered Model",
      description:
        "Benefit from an advanced multilayered model designed to improve accuracy and minimize errors.",
    },
  ];

  return (
    <div className="problem__container">
      <div className="problem__sectionHeading d-flex flex-column align-items-center justify-content-center">
        <p className="my-0">What We Solve</p>
        <div className="problem__borderDiv"></div>
      </div>
      <div className="problem__infoTextHeading d-flex justify-content-center">
        <p>Features</p>
      </div>
      <div className="problem__containerDiv">
        {cardData.map((card, index) => (
          <div
            className="problem__cardsDiv card"
            style={{ width: "22rem" }}
            key={index}
          >
            <img
              src={card.imgSrc}
              className="card-img-top"
              alt={card.title}
              height={card.imgHeight || "auto"}
            />
            <div className="card-body">
              <h5
                className="card-title text-center fs-3"
                style={{ fontSize: "27px", fontWeight: "bold" }}
              >
                {card.title}
              </h5>
              <p className="card-text text-center">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problem;
