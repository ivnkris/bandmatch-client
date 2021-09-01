import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

import { Modal } from "react-bootstrap";
import "./AboutUsCard.css";

import { useModal } from "../../contexts/ModalProvider";

const AboutUsCard = (props) => {
  const { setModalState, modalState } = useModal();

  const displayInfo = (description) => {
    setModalState({
      open: true,
      content: (
        <Modal.Body className="solid-background">
          <div
            className="profile-preview-image"
            style={{
              backgroundImage: "url(" + props.imageUrl + ")",
              backgroundPosition: "center center",
            }}
          ></div>
          <p>{description}</p>
        </Modal.Body>
      ),
    });
  };

  return (
    <div className="card-container card-container-shortest mx-3 card-width">
      <div
        className="card-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
          backgroundPosition: "center center",
        }}
      ></div>
      <div>
        <h3 className="title text-limit-one-line my-3"> {props.name} </h3>
        <p className="text-limit-one-line my-3"> {props.description} </p>
      </div>
      <div className="icons-container my-3">
        <a href={props.githubUrl} target="_blank" rel="noopener noreferrer">
          <AiFillGithub size={30} />
        </a>
        <a href={props.linkedinUrl} target="_blank" rel="noopener noreferrer">
          <AiFillLinkedin size={30} />
        </a>
        <FaUser size={30} onClick={() => displayInfo(props.description)} />
      </div>
    </div>
  );
};

export default AboutUsCard;
