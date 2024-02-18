import bg from "../../assets/animal-banner.jpeg";
import * as React from "react";

const Splash = () => {
  return (
    <div className="splash-container">
      <img className="banner" src={bg} />
      <div className="splash">
        <div className="text">
          <div className="title">Sentiment Storybook</div>
          {/* <div className="subtitle">Nurture emotional literacy through imagination.</div> */}
          <div
            className="subtitle"
            onClick={() => {
              // Find the element to scroll to
              const element = document.getElementById("targetElement");

              // Scroll to the element
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            style={{ cursor: "pointer" }}
          >
            Nurture emotional literacy through imagination.
          </div>
        </div>
      </div>
    </div>
  );
};

export { Splash };
