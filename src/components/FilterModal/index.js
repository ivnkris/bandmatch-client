import { Modal } from "react-bootstrap";

import "../../App.css";
import Button from "../Button/index";
import MultiSelectDropDown from "../MultiSelectDropdown";
import genreOptions from "../../data/genreOptions";
import instrumentOptions from "../../data/instrumentOptions";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../contexts/UserProvider";

function FilterModal(props) {
  const { dispatch, state } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const handleApplyFilters = async ({
    genre,
    instruments,
    experienceLevel,
    lookingFor,
    userType,
  }) => {
    const payload = {
      genre,
      instruments,
      experienceLevel,
      lookingFor,
      userType,
    };

    // save filters in global context
    dispatch({
      type: "SETUSERFILTERS",
      payload,
    });

    // hide modal
    props.onHide();

    // save filters in local storage, in case page is reloaded
    const filters = JSON.stringify(payload);
    localStorage.setItem("userFilters", filters);
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
        <form onSubmit={handleSubmit(handleApplyFilters)}>
          <p>LOCATION</p>
          <MultiSelectDropDown
            options={genreOptions}
            defaultValue={state.userFilters.genre}
            placeholder="Select genre"
            isMulti={true}
            name="genre"
            control={control}
            label="Genre"
          />
          <MultiSelectDropDown
            options={instrumentOptions}
            defaultValue={state.userFilters.instruments}
            placeholder="Select instruments"
            isMulti={true}
            name="instruments"
            control={control}
            label="Instruments"
          />
          <MultiSelectDropDown
            options={instrumentOptions}
            defaultValue={state.userFilters.lookingFor}
            placeholder="Select instruments"
            isMulti={true}
            name="lookingFor"
            control={control}
            label="Looking for"
          />
          <MultiSelectDropDown
            options={[
              { value: "newbie", label: "newbie" },
              { value: "midway", label: "midway" },
              { value: "expert", label: "expert" },
            ]}
            defaultValue={state.userFilters.experienceLevel}
            placeholder="Select experience level"
            isMulti={true}
            name="experienceLevel"
            control={control}
            label="Experience level"
          />
          <MultiSelectDropDown
            options={[
              { value: "band", label: "band" },
              { value: "musician", label: "musician" },
            ]}
            defaultValue={state.userFilters.userType}
            placeholder="Select performer type"
            isMulti={true}
            name="userType"
            control={control}
            label="Band or Musician"
          />
          <Button
            type="submit"
            label="APPLY"
            mode="primary"
            size="medium"
            onClick={handleApplyFilters}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default FilterModal;
