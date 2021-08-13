import { FaComment } from "react-icons/fa";

import { GrSoundcloud } from "react-icons/gr";

import "./ProfileInfo.css";

const ProfileInfo = (props) => {
  return (
    <div className="profile-strip">
      <div
        className="profile-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
        }}
      ></div>
      {/* <img className="musician-image" src="" alt="musician name" /> */}
      <div className="musician-info-div text-center">
        <p className="title mb-2">{props.name}</p>
        <p className="p-yellow pb-2 text-limit-one-line">
          {props.instruments.join(" | ")}
        </p>
        <p className="p-yellow pb-2 text-limit-one-line">
          {" "}
          {props.genre.join(" | ")}
        </p>

        <p className="mb-3">{props.openTo}</p>
        <div>{props.description}</div>

        <p className="p-yellow mt-2 text-limit-one-line">
          LOOKING FOR:{" "}
          <span className="looking-for">{props.lookingFor.join(" | ")}</span>
        </p>
        <div className="profile-icon-container mt-4">
          <FaComment size={24} />
          <a target="_blank" rel="noreferrer" href={props.soundCloudUrl}>
            <GrSoundcloud size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
