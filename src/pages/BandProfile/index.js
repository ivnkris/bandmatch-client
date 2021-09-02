import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import $ from "jquery";

import { useUserContext } from "../../contexts/UserProvider";
import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import Button from "../../components/Button";
import Title from "../../components/Title";
import {
  BAND,
  GENRESINSTRUMENTS,
  GIGS,
  VALIDATE_BAND_MEMBERS,
} from "../../graphql/queries";
import {
  constructGigCards,
  constructBandMemberCards,
} from "../../utils/constructCards";
import "./BandProfile.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useCallback, useEffect, useState } from "react";
import MultiSelectDropDown from "../../components/MultiSelectDropdown";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { BsChevronCompactDown } from "react-icons/bs";
import ImageUpload from "../../components/ImageUpload";
import FormInput from "../../components/FormInput";
import { useModal } from "../../contexts/ModalProvider";
import { Modal } from "react-bootstrap";
import {
  generateDefaultValues,
  generateOptions,
  generateRoleOptions,
} from "../../utils/generateMultiDropdownOptions";
import { useForm } from "react-hook-form";
import locationOptions from "../../data/locationOptions";
import { UPDATE_BAND } from "../../graphql/mutations";
import getMusicianIds from "../../utils/getMusicianIds";

const BandProfile = (props) => {
  const { state } = useUserContext();
  const { id } = useParams();
  const [modalUpdateData, setModalUpdateData] = useState(null);
  const [imageUrlBand, setImageUrlBand] = useState();
  const { setModalState } = useModal();
  const [validBandMembers, setValidBandMembers] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  let history = useHistory();

  const { data: bandData, loading, error: bandError } = useQuery(BAND, {
    variables: {
      bandId: id,
    },
    onCompleted: (data) => {
      const validBandMemberIds = getMusicianIds(data.band.musicians);
      setValidBandMembers(validBandMemberIds);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  let myBandProfile = [];

  if (bandData) {
    myBandProfile = bandData.band.musicians.filter((musician) => {
      return musician.id === state.user.id;
    });
  }

  const refreshPage = () => {
    setModalState({
      open: false,
    });

    history.go(0);
  };

  const [validateBandMembers, { data: userValidationData }] = useLazyQuery(
    VALIDATE_BAND_MEMBERS,
    {
      fetchPolicy: "no-cache",
      onCompleted: ({ checkIfMusicianExists }) => {
        const validUsers = checkIfMusicianExists
          .filter((musician) => musician.exists)
          .map((musician) => {
            return musician.id;
          });

        if (validUsers) {
          setValidBandMembers([...validUsers, state.user.id]);
        } else {
          setValidBandMembers([state.user.id]);
        }
      },
    }
  );

  let invalidUsers = [];
  if (userValidationData) {
    const filteredInvalidUsers = userValidationData.checkIfMusicianExists.filter(
      (musician) => !musician.exists
    );

    invalidUsers = filteredInvalidUsers.map((invalidUser) => invalidUser.email);
  }

  const validateMembers = useCallback(() => {
    const membersInput = $("#membersInput").val();

    if (!membersInput) {
      setValidBandMembers([state.user.id]);
      invalidUsers = [];
      return;
    }

    const formattedMembers = membersInput.split(",").map((member) => {
      return member.trim();
    });

    validateBandMembers({
      variables: {
        checkIfMusicianExistsInput: { musicians: formattedMembers },
      },
    });

    invalidUsers = [];
  }, [validateBandMembers]);

  const [submitEditBandInfo] = useMutation(UPDATE_BAND, {
    onCompleted: () => {
      setModalState({
        open: true,
        content: (
          <>
            <Modal.Header className="solid-background" closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className="solid-background">
              <p>Information updated successfully</p>
            </Modal.Body>
          </>
        ),
      });

      setTimeout(() => {
        refreshPage();
      }, 1500);
    },
    onError: (error) => {
      console.log(error);
      setModalState({
        open: true,
        content: (
          <Modal.Body className="solid-background">
            <p>Sorry, we couldn't update your page at the moment.</p>
          </Modal.Body>
        ),
      });
    },
  });

  const onSubmitEditBand = useCallback(
    (formData) => {
      if (formData.lookingFor) {
        formData.openToMembers = true;
      } else if (!formData.lookingFor || formData.lookingFor[0] === false) {
        formData.openToMembers = false;
      }

      formData.numberOfMembers = parseFloat(formData.numberOfMembers);
      formData.openToCollaboration = formData.openToCollaboration = "true"
        ? true
        : false;

      formData.musicians = validBandMembers;

      formData.imageUrl = imageUrlBand ? imageUrlBand : bandData.band.imageUrl;

      submitEditBandInfo({
        variables: {
          updateBandInput: {
            bandInfo: { ...formData },
            bandId: bandData.band.id,
          },
        },
      });
    },
    [bandData, submitEditBandInfo, validBandMembers, imageUrlBand]
  );

  const [getGenreInstruments, { data: genreInstrumentsData }] = useLazyQuery(
    GENRESINSTRUMENTS,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        setModalUpdateData(data);
      },
    }
  );

  const renderBandModal = () => {
    getGenreInstruments();
  };

  useEffect(() => {
    if (genreInstrumentsData && bandData) {
      const band = bandData.band;
      const filteredBandMusicians = band.musicians.filter(
        (musician) => musician.id !== state.user.id
      );
      const bandMusicians = filteredBandMusicians.map(
        (musician) => musician.email
      );
      const genres = generateOptions(genreInstrumentsData.genres);
      const bandGenres = generateDefaultValues(band.genre);
      const instruments = generateOptions(genreInstrumentsData.instruments);
      const bandInstruments = generateDefaultValues(band.instruments);
      const lookingFor = generateRoleOptions(genreInstrumentsData.instruments);
      const bandLookingFor = generateDefaultValues(band.lookingFor);

      const newData = modalUpdateData;
      setModalState({
        open: true,
        content: (
          <>
            <Modal.Header className="solid-background" closeButton>
              <Modal.Title>Edit {band.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="solid-background">
              <form onSubmit={handleSubmit(onSubmitEditBand)}>
                <Accordion preExpanded={["a"]}>
                  <AccordionItem uuid="a" className="accordion-container">
                    <AccordionItemHeading className="accordion-heading-override">
                      <AccordionItemButton>
                        THE BASICS <BsChevronCompactDown size={24} />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>BAND NAME *</p>
                      <FormInput
                        value={band.name}
                        placeholder="Band Name"
                        error={errors.name}
                        register={register("name")}
                        required={true}
                      />
                      <p>NUMBER OF MEMBERS *</p>
                      <FormInput
                        value={band.numberOfMembers}
                        placeholder="Members"
                        error={errors.numberOfMembers}
                        register={register("numberOfMembers", {
                          required: true,
                        })}
                        required={true}
                        type="number"
                      />
                      <p>MEMBERS</p>
                      <p className="small-text regular-text">
                        Enter the email address of members with a BandMatch
                        account. Separate each with a comma.
                      </p>
                      <FormInput
                        value={bandMusicians}
                        register={register("musicians")}
                        placeholder="Members"
                        error={errors.numberOfMembers}
                        id="membersInput"
                        onChange={() => {
                          validateMembers();
                        }}
                        onBlur={() => {
                          validateMembers();
                        }}
                      />
                      {invalidUsers.length > 0 && (
                        <p className="small-text regular-text p-yellow">
                          {" "}
                          We couldn't find Bandmatch profiles for the following
                          users: {invalidUsers.join(", ")}.
                        </p>
                      )}
                      <p>QUICK OVERVIEW *</p>
                      <FormInput
                        value={band.description}
                        placeholder="Brief description"
                        error={errors.description}
                        register={register("description")}
                        required={true}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid="b">
                    <AccordionItemHeading className="accordion-heading-override">
                      <AccordionItemButton>
                        COUPLE SPECIFICS <BsChevronCompactDown size={24} />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>BAND PIC</p>
                      <ImageUpload
                        email={state.user.email}
                        setImageUrl={setImageUrlBand}
                        imageUrl={imageUrlBand}
                      />
                      <p>CITY *</p>
                      <section className="dropdown-div py-3">
                        <select
                          className="select-dropdown"
                          id="location"
                          name="location"
                          placeholder="Select your location"
                          {...register("location", { required: true })}
                        >
                          {locationOptions.map((location) => {
                            return (
                              <option
                                defaultValue={band.location}
                                className="option-text"
                                value={location.label}
                                key={location.label}
                              >
                                {location.label}
                              </option>
                            );
                          })}
                        </select>
                      </section>

                      <p>MUSIC GENRE *</p>
                      <MultiSelectDropDown
                        defaultValue={bandGenres}
                        options={genres}
                        placeholder="Select your genre(s)"
                        isMulti={true}
                        name="genre"
                        control={control}
                        required={true}
                      />
                      <p>EXPERIENCE *</p>
                      <section className="dropdown-div py-3">
                        <select
                          defaultValue={band.experienceLevel}
                          className="select-dropdown"
                          id="experienceLevel"
                          name="experienceLevel"
                          placeholder="Select your experience level"
                          {...register("experienceLevel", {
                            required: true,
                          })}
                          required={true}
                        >
                          <option
                            key="newbie"
                            className="option-text"
                            value="newbie"
                          >
                            Newbie
                          </option>
                          <option
                            key="midway"
                            className="option-text"
                            value="midway"
                          >
                            Midway
                          </option>
                          <option
                            key="expert"
                            className="option-text"
                            value="expert"
                          >
                            Expert
                          </option>
                        </select>
                      </section>

                      <p>INSTRUMENTS *</p>
                      <MultiSelectDropDown
                        defaultValue={bandInstruments}
                        options={instruments}
                        placeholder="Band instruments"
                        isMulti={true}
                        name="instruments"
                        control={control}
                        required={true}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid="c">
                    <AccordionItemHeading className="accordion-heading-override">
                      <AccordionItemButton>
                        COLLABS AND MEDIA <BsChevronCompactDown size={24} />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>FEATURE SONG</p>
                      <p className="regular-text small-text">
                        Enter the Soundcloud url of your top song
                      </p>
                      <FormInput
                        value={band.soundCloudUrl}
                        placeholder="Soundcloud url"
                        error={errors.soundCloudUrl}
                        register={register("soundCloudUrl", {
                          required: false,
                        })}
                      />
                      <p>WEBSITE</p>
                      <FormInput
                        value={band.websiteUrl}
                        placeholder="Website url"
                        error={errors.websiteUrl}
                        register={register("websiteUrl", {
                          required: false,
                        })}
                      />
                      <p>ARE YOU OPEN TO COLLABS?</p>
                      <section className="dropdown-div py-3">
                        <select
                          defaultValue={band.openToCollaboration}
                          className="select-dropdown"
                          id="openToCollaboration"
                          name="openToCollaboration"
                          placeholder="Select your experience level"
                          {...register("openToCollaboration", {
                            required: true,
                          })}
                        >
                          <option className="option-text" value={true}>
                            YES
                          </option>
                          <option className="option-text" value={false}>
                            NO
                          </option>
                        </select>
                      </section>
                      <p className="pt-10">LOOKING FOR NEW MEMBERS?</p>
                      <p className="regular-text small-text">
                        If you're looking for new members, please select from
                        the options below. Otherwise, select "Not looking atm".
                      </p>
                      <MultiSelectDropDown
                        defaultValue={bandLookingFor}
                        options={lookingFor}
                        placeholder="Musician type..."
                        isMulti={true}
                        name="lookingFor"
                        control={control}
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
                <Button
                  type="submit"
                  label="SUBMIT"
                  mode="primary"
                  size="medium"
                ></Button>
              </form>
            </Modal.Body>
          </>
        ),
      });
    }
  }, [
    bandData,
    control,
    errors.description,
    errors.name,
    errors.numberOfMembers,
    errors.soundCloudUrl,
    errors.websiteUrl,
    genreInstrumentsData,
    handleSubmit,
    imageUrlBand,
    modalUpdateData,
    onSubmitEditBand,
    register,
    setModalState,
    state.user.email,
    state.user.id,
    validateMembers,
  ]);

  const { data: gigsData, loading: gigsLoading } = useQuery(GIGS, {
    variables: {
      gigsFilters: {
        band: id,
      },
    },

    onError: (error) => {
      console.log(error);
    },
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (bandData) {
    const band = bandData.band;
    const name = band.name;
    const openTo = () => {
      if (band.openToCollaboration && band.openToMembers) {
        return "OPEN TO COLLABORATION | OPEN TO NEW MEMBERS";
      } else if (band.openToCollaboration && !band.openToMembers) {
        return "OPEN TO COLLABORATION";
      } else if (!band.openToCollaboration && band.openToMembers) {
        return "OPEN TO NEW MEMBERS";
      } else {
        return "";
      }
    };
    let genres = [];
    let instruments = [];
    let lookingFor = [];
    band.genre.forEach((genre) => {
      genres.push(genre.name);
    });
    band.instruments.forEach((instrument) => {
      instruments.push(instrument.name);
    });
    band.lookingFor.forEach((looking) => {
      lookingFor.push(looking.role);
    });

    const redirectToPage = (event) => {
      const page = event.currentTarget.id;

      window.location.replace(`/${page}`);
    };

    return (
      <div className="profile-container">
        <div className="p-2"></div>
        <div className="see-through-background-90 text-align-center profile-title-div">
          {myBandProfile.length ? (
            <Title
              type="profile"
              text={name}
              myProfile={myBandProfile}
              onClick={renderBandModal}
            />
          ) : (
            <Title type="profile" text={name} />
          )}
          <p className="mb-3">{openTo()}</p>

          {lookingFor.length !== 0 && (
            <p className="p-yellow mt-2 text-limit-one-line">
              LOOKING FOR:{" "}
              <span className="looking-for">{lookingFor.join(" | ")}</span>
            </p>
          )}
        </div>
        <ProfileInfo
          imageUrl={band.imageUrl}
          name={name}
          instruments={instruments}
          genre={genres}
          description={band.description}
          experienceLevel={band.experienceLevel}
          lookingFor={lookingFor}
          soundCloudUrl={band.soundCloudUrl}
        />

        {bandData && band.soundCloudUrl && (
          <SoundCloudWidget soundCloudUrl={band.soundCloudUrl} />
        )}

        <div className="see-through-background-90 text-align-center">
          <p className="title mb-2 pt-2 fs-1">{name}'s GIGS</p>

          {gigsLoading && <LoadingSpinner />}
          {gigsData && gigsData.gigs.length ? (
            <div className="cards-container">
              {constructGigCards(gigsData.gigs)}
            </div>
          ) : myBandProfile.length ? (
            <div className="no-gigs-bands-container">
              <div>
                <p className="mb-2 fs-3">Your band has no gigs</p>
              </div>
              <div>
                <Button
                  label="FIND A GIG"
                  mode="primary"
                  size="medium"
                  onClick={redirectToPage}
                  buttonId="gig"
                />
              </div>
            </div>
          ) : (
            <div className="no-gigs-bands-container">
              <p className="mb-3 fs-3">
                {`${bandData.band.name}`} have no gigs
              </p>
            </div>
          )}
        </div>

        <div className="see-through-background-90 text-align-center">
          <p className="title mb-2 pt-2 fs-1">{band.name}'s BAND MEMBERS</p>

          <div className="cards-container">
            {bandData && (
              <div className="cards-container">
                {constructBandMemberCards(band.musicians, "shortest")}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default BandProfile;
