import { Modal } from "react-bootstrap";
import { FaComment, FaUser } from "react-icons/fa";
import getInstrumentIcons from "../../utils/getInstrumentIcons";

import "./ProfilePreviewModal.css";

import SoundCloudWidget from "../SoundCloudWidget";

function ProfilePreviewModal(props) {
  const title =
    props.user.type === "band"
      ? props.user.name
      : props.user.firstName + " " + props.user.lastName;
  const instruments = getInstrumentIcons(props.user.instruments);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="solid-background text-align-center">
        <div
          className="profile-preview-image"
          style={{
            backgroundImage: "url(" + props.user.imageUrl + ")",
          }}
        >
          <div className="image-overlay">
            <div className="profile-preview-image-overlay-item">
              {props.user.experienceLevel}
            </div>
          </div>
        </div>
        <h5 className="title">{title}</h5>
        <p className="p-yellow pb-2">{props.user.genre.join("/")}</p>
        <div className="pb-10">{[...instruments]}</div>
        <p>{props.user.description}</p>
        <div className="flex-apart icons-container">
          <FaComment size={30} onClick={props.handleMessage} />
          <FaUser size={30} onClick={console.log("hello")} />
        </div>
        <div>
          <SoundCloudWidget soundCloudUrl={props.user.soundCloudUrl} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProfilePreviewModal;
