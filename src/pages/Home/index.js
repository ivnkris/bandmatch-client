import { Modal } from "react-bootstrap";

import "./Home.css";

import assemblePhoto from "../../assemble.png";
import gigPhoto from "../../gig.png";

import { useModal } from "../../contexts/ModalProvider";
import Button from "../../components/Button/index";

const Home = (props) => {
  const { setModalState, modalState } = useModal();

  const showModal = (event) => {
    console.log();

    if (event.target.id === "assemble") {
      setModalState({
        open: true,
        content: (
          <Modal.Body className="solid-background">
            <div
              className="profile-preview-image"
              style={{
                backgroundImage: "url(" + assemblePhoto + ")",
                backgroundPosition: "center center",
              }}
            ></div>
            <h4>Assemble a band</h4>
            <ol>
              <li>Find musicians looking to join a band</li>
              <li>Click to see their profile</li>
              <li>Send them a message</li>
              <li>Filter your search</li>
            </ol>
          </Modal.Body>
        ),
      });
    }

    if (event.target.id === "collab") {
      setModalState({
        open: true,
        content: (
          <Modal.Body className="solid-background">
            <div
              className="profile-preview-image"
              style={{
                backgroundImage: "url(" + assemblePhoto + ")",
                backgroundPosition: "center center",
              }}
            ></div>
            <h4>Find collabs</h4>
            <ol>
              <li>Find musicians or bands looking to collab</li>
              <li>Click to see their profile</li>
              <li>Send them a message</li>
              <li>Filter your search</li>
            </ol>
          </Modal.Body>
        ),
      });
    }

    if (event.target.id === "gig") {
      setModalState({
        open: true,
        content: (
          <Modal.Body className="solid-background">
            <div
              className="profile-preview-image"
              style={{
                backgroundImage: "url(" + gigPhoto + ")",
                backgroundPosition: "center center",
              }}
            ></div>
            <h4>Find a Gig</h4>
            <ol>
              <li>Find a gig to play</li>
              <li>See more info</li>
              <li>Send request to play</li>
            </ol>
          </Modal.Body>
        ),
      });
    }
  };
  return (
    <div className="home-container">
      <h1>Unleash Your Music to the World</h1>
      <div className="how-it-works-container">
        <h2 className="my-2">HOW IT WORKS</h2>
        <div className="home-buttons-container">
          <Button
            label="ASSEMBLE"
            size="large"
            mode="secondary"
            buttonId="assemble"
            onClick={showModal}
          />
          <Button
            label="COLLAB"
            size="large"
            mode="secondary"
            buttonId="collab"
            onClick={showModal}
          />
          <Button
            label="GIG"
            size="large"
            mode="secondary"
            buttonId="gig"
            onClick={showModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
