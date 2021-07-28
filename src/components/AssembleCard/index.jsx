import { FaComment, FaUser } from "react-icons/fa";

import "./AssembleCard.css";

const AssembleCard = (props) => {
  return (
    <div className="card-container">
      <div
        className="card-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
        }}
      >
        <div className="card-image-overlay">
          <div className="card-image-overlay-item"> {props.genre}</div>
          <div className="card-image-overlay-item">{props.experienceLevel}</div>
        </div>
      </div>
      <div>
        <h3 className="card-title">
          {props.firstName} {props.lastName}
        </h3>
        <p className="card-description">{props.instruments.join(" ")}</p>
        <p className="card-description">
          LOOKING FOR:{" , "}
          <span className="lowercase-text"> {props.lookingFor.join(" ")} </span>
        </p>
        <div className="icon-container">
          <FaComment size={24} />
          <FaUser size={24} />
        </div>
      </div>
    </div>
  );
};

export default AssembleCard;
