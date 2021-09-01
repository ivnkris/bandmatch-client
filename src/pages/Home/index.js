import { Modal } from "react-bootstrap";
import { FiArrowDownCircle } from "react-icons/fi";

import "./Home.css";

import assemblePhoto from "../../images/assemble.jpg";
import colabPhoto from "../../images/colab.jpg";
import gigPhoto from "../../images/gig.jpg";

import { useModal } from "../../contexts/ModalProvider";
import Button from "../../components/Button/index";
import TextPrinter from "../../components/TextPrinter";

const Home = (props) => {
  const { setModalState } = useModal();

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
            <div className="info-div">
              <h4 className="text-center py-2">Assemble a band</h4>
              <ol>
                <li>Find musicians looking to join a band</li>
                <li>Click to see their profile</li>
                <li>Send them a message</li>
                <li>Filter your search</li>
              </ol>
            </div>
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
                backgroundImage: "url(" + colabPhoto + ")",
                backgroundPosition: "center center",
              }}
            ></div>
            <div className="info-div">
              <h4 className="text-center py-2">Find collabs</h4>
              <ol>
                <li>Find musicians or bands looking to collab</li>
                <li>Click to see their profile</li>
                <li>Send them a message</li>
                <li>Filter your search</li>
              </ol>
            </div>
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
            <div className="info-div w-50">
              <h4 className="text-center py-2">Find a Gig</h4>
              <ol>
                <li>Find a gig to play</li>
                <li>See more info</li>
                <li>Send request to play</li>
              </ol>
            </div>
          </Modal.Body>
        ),
      });
    }
  };
  return (
    <div className="home-container">
      <div className="pt-5 text-center">
        <TextPrinter />
        <h2 className="mt-5">HOW IT WORKS</h2>
        <div className="mt-5">
          <FiArrowDownCircle size="2rem" />
        </div>
      </div>
      <div className="how-it-works-container">
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
