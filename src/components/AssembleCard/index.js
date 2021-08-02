import { FaComment, FaUser } from "react-icons/fa";
import getInstrumentIcons from "../../utils/getInstrumentIcons";

import "../../App.css";
import "./AssembleCard.css";

const AssembleCard = (props) => {
  const title =
    props.type === "band" ? props.name : props.firstName + props.lastName;
  const instruments =
    props.type === "band"
      ? getInstrumentIcons(props.instruments)
      : props.instruments.join(" ");

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
        <h3 className="card-title">{title}</h3>
        <p>{[...instruments]}</p>
        <p>
          LOOKING FOR:{" "}
          <span className="lowercase-text">{props.lookingFor.join(", ")} </span>
        </p>
        <div className="icon-container">
          <FaComment size={24} onClick={props.handleMessage} />
          <FaUser size={24} onClick={props.handleProfilePreview} />
        </div>
      </div>
    </div>
  );
};

export default AssembleCard;
