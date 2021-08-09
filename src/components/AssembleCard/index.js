import { FaComment, FaUser } from "react-icons/fa";
import getInstrumentIcons from "../../utils/getInstrumentIcons";

import "../../App.css";
import "./AssembleCard.css";

const AssembleCard = (props) => {
  const title =
    props.type === "band" ? props.name : props.firstName + " " + props.lastName;
  const instruments = getInstrumentIcons(props.instruments);

  return (
    <div
      className={[`card-container-${props.version}`, `card-container`].join(
        " "
      )}
      key={JSON.stringify(props.uuid)}
    >
      <div
        className="card-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
        }}
      >
        <div className="card-image-overlay">
          <div className="card-image-overlay-item">{props.experienceLevel}</div>
        </div>
      </div>
      <div className="card-body">
        <h3 className="title text-limit-one-line">{title}</h3>
        <p className="p-yellow pb-2 text-limit-one-line">
          {props.genre.join("/")}
        </p>
        <p className="card-text-instruments text-limit-one-line">
          {[...instruments]}
        </p>
        {props.version === "extended" && (
          <>
            <p className="p-yellow card-text">LOOKING FOR: </p>
            <p className="text-limit-one-line">
              {props.lookingFor.join(" | ")}
            </p>
          </>
        )}
        <div className="icon-container">
          <FaComment size={24} onClick={props.handleMessage} />
          <FaUser size={24} onClick={props.handleProfilePreview} />
        </div>
      </div>
    </div>
  );
};

export default AssembleCard;
