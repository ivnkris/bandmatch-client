import { Modal } from "react-bootstrap";

import "../../App.css";
import Button from "../Button/index";

function FilterModal(props) {
  const handleApplyFilters = () => {
    props.onHide();
    console.log("getting more info :)");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className="solid-background"
        closeVariant="white"
      >
        <Modal.Title id="contained-modal-title-vcenter" className="title">
          SELECT FILTERS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="solid-background">
        <p>LOCATION</p>
        <p>GENRE</p>
        <p>INSTRUMENTS</p>
        <p>LOOKING FOR</p>
      </Modal.Body>
      <Modal.Footer className="solid-background">
        <Button
          label="APPLY"
          mode="primary"
          size="medium"
          onClick={handleApplyFilters}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default FilterModal;
