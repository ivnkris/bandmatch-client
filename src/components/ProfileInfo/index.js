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

      <div className="musician-info-div text-center">
        {props.myProfile && <p className="title mb-2">{props.name}</p>}
        {props.instruments && (
          <p className="p-yellow pb-2 ">
            Instrument(s): {props.instruments.join(" | ")}
          </p>
        )}
        {props.genre && (
          <p className="p-yellow pb-2 text-limit-one-line">
            Genre(s): {props.genre.join(" | ")}
          </p>
        )}

        {props.websiteUrl && (
          <a href={props.websiteUrl} className="mb-3">
            {props.websiteUrl}
          </a>
        )}

        {props.postcode && <p className="mb-3">{props.postcode}</p>}

        {props.openTo && props.myProfile && (
          <p className="mb-3">{props.openTo}</p>
        )}

        <div>{props.description}</div>

        {props.myProfile && props.lookingFor && (
          <p className="p-yellow mt-2 text-limit-one-line">
            LOOKING FOR:{" "}
            <span className="looking-for">{props.lookingFor.join(" | ")}</span>
          </p>
        )}
        <div className="profile-icon-container mt-4">
          <FaComment size={24} />
          {props.soundCloudUrl && (
            <a target="_blank" rel="noreferrer" href={props.soundCloudUrl}>
              <GrSoundcloud size={32} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
