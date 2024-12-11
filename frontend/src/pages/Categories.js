import "./Categories.css";

const Categories = () => {
  return (
    <div className="categories__container d-flex flex-column align-items-center justify-content-center">
      <div className="categories__sectionHeading d-flex flex-column align-items-center justify-content-center">
        <p style={{ color: "white" }} className="my-0">
          How Can Medicare AI Assist You?
        </p>
        <div className="categories__borderDiv"></div>
      </div>
      <div className="categories__categoryHeading">
        <p style={{ color: "white" }}>Health Prediction Categories</p>
      </div>
      <div className="categories__predictionBox">
        <div className="categories__rowContainer row">
          <div className="categories__columnContainerDiv col d-flex">
            <p
              style={{ color: "white" }}
              className="categories__serialInfo my-0"
            >
              1
            </p>
            <p style={{ color: "white" }} className="categories__name mb-0">
              Mental Health Assessment
            </p>
          </div>
          <div className="categories__columnContainerDiv col d-flex">
            <p
              style={{ color: "white" }}
              className="categories__serialInfo my-0"
            >
              2
            </p>
            <p style={{ color: "white" }} className="categories__name mb-0">
              Symptom Analysis
            </p>
          </div>
          <div className="categories__columnContainerDiv col d-flex">
            <p
              style={{ color: "white" }}
              className="categories__serialInfo my-0"
            >
              3
            </p>
            <p style={{ color: "white" }} className="categories__name mb-0">
              Lifestyle Recommendations
            </p>
          </div>
          <div className="categories__columnContainerDiv col d-flex">
            <p
              style={{ color: "white" }}
              className="categories__serialInfo my-0"
            >
              4
            </p>
            <p style={{ color: "white" }} className="categories__name mb-0">
              Personalized Health Advice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
