import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import $ from "jquery";

import { useModal } from "../../contexts/ModalProvider";
import { CREATE_BAND, UPDATE_MUSICIAN } from "../../graphql/mutations";
import { useUserContext } from "../../contexts/UserProvider";
import {
  BANDS,
  GENRESINSTRUMENTS,
  GIGS,
  MUSICIAN_USER,
  VALIDATE_BAND_MEMBERS,
} from "../../graphql/queries";
import {
  constructGigCards,
  constructPerformerCards,
} from "../../utils/constructCards";
import "./MusicianProfile.css";
import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import Title from "../../components/Title";
import Button from "../../components/Button";
import MultiSelectDropDown from "../../components/MultiSelectDropdown";
import FormInput from "../../components/FormInput";
import {
  generateDefaultValues,
  generateOptions,
  generateRoleOptions,
} from "../../utils/generateMultiDropdownOptions";
import ImageUpload from "../../components/ImageUpload";
import locationOptions from "../../data/locationOptions";
import LoadingSpinner from "../../components/LoadingSpinner";

const MusicianProfile = (props) => {
  const { state } = useUserContext();
  const { modalState, setModalState } = useModal();
  let history = useHistory();
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

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    control: control2,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const { id: musicianId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const [imageUrlBand, setImageUrlBand] = useState();
  const [modalUpdateData, setModalUpdateData] = useState(null);
  const [bandUpdateData, setBandUpdateData] = useState(null);

  const [validBandMembers, setValidBandMembers] = useState([musicianId]);

  const myProfile = musicianId === state.user.id;

  const refreshPage = () => {
    setModalState({
      open: false,
    });

    history.go(0);
  };

  const redirectToPage = (url) => {
    setModalState({
      open: false,
    });

    history.push(url);
  };

  const redirectToHomepage = () => {
    setModalState({
      open: false,
    });

    history.push("/");
  };

  const { data: musicianData, loading, error } = useQuery(MUSICIAN_USER, {
    variables: {
      musicianUserId: musicianId,
    },
  });

  const [submitEditProfileInfo] = useMutation(UPDATE_MUSICIAN, {
    onCompleted: (data) => {
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

  const onSubmitEditProfile = useCallback(
    (formData) => {
      if (formData.openToCollaboration === "true") {
        formData.openToCollaboration = true;
      } else {
        formData.openToCollaboration = false;
      }

      if (formData.openToJoiningBand === "true") {
        formData.openToJoiningBand = true;
      } else {
        formData.openToJoiningBand = false;
      }

      submitEditProfileInfo({
        variables: {
          updateMusicianUserInput: {
            musicianInfo: { ...formData, imageUrl },
            musicianId: musicianId,
          },
        },
      });
    },
    [musicianId, submitEditProfileInfo, imageUrl]
  );

  const [
    editProfileModal,
    { data: editProfileGenreInstrumentsData },
  ] = useLazyQuery(GENRESINSTRUMENTS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setModalUpdateData(data);
    },
  });

  const renderEditProfileModal = () => {
    editProfileModal({
      variables: {
        musicianUserId: musicianId,
      },
    });
    setModalUpdateData(null);
  };

  useEffect(() => {
    if (editProfileGenreInstrumentsData && musicianData) {
      if (!editProfileGenreInstrumentsData) {
        setModalState({
          open: true,
          content: (
            <Modal.Body className="solid-background">
              <p>
                {" "}
                Sorry, you can't update your profile information at this time.
                Please try again later!{" "}
              </p>
            </Modal.Body>
          ),
        });
      } else {
        const musician = musicianData.musicianUser;
        const genres = generateOptions(editProfileGenreInstrumentsData.genres);
        const userGenres = generateDefaultValues(musician.genre);
        const instruments = generateOptions(
          editProfileGenreInstrumentsData.instruments
        );
        const userInstruments = generateDefaultValues(musician.instruments);
        const lookingFor = generateRoleOptions(
          editProfileGenreInstrumentsData.instruments
        );
        const userLookingFor = generateDefaultValues(musician.lookingFor);
        const newData = modalUpdateData;
        setModalState({
          open: true,
          content: (
            <>
              <Modal.Header className="solid-background" closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body className="solid-background">
                <form onSubmit={handleSubmit(onSubmitEditProfile)}>
                  <Accordion preExpanded={["a"]}>
                    <AccordionItem uuid="a" className="accordion-container">
                      <AccordionItemHeading className="accordion-heading-override">
                        <AccordionItemButton>
                          THE BASICS <BsChevronCompactDown size={24} />
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>FIRST NAME</p>
                        <FormInput
                          value={musician.firstName}
                          error={errors.firstName}
                          register={register("firstName")}
                        />
                        <p>LAST NAME</p>
                        <FormInput
                          value={musician.lastName}
                          error={errors.lastName}
                          register={register("lastName")}
                        />
                        <p>EMAIL</p>
                        <FormInput
                          value={musician.email}
                          error={errors.email}
                          register={register("email")}
                        />
                        <p>CITY</p>
                        <section className="dropdown-div py-3">
                          <select
                            className="select-dropdown"
                            id="location"
                            name="location"
                            placeholder="Select your location"
                            {...register("location", { required: true })}
                          >
                            <option
                              defaultValue={musician.location}
                              className="option-text"
                              value={musician.location}
                              key="selected"
                            >
                              {musician.location}
                            </option>
                            {locationOptions.map((location) => {
                              return (
                                <option
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
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid="b" className="accordion-container">
                      <AccordionItemHeading className="accordion-heading-override">
                        <AccordionItemButton>
                          SOCIALS AND INFO <BsChevronCompactDown size={24} />
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>PROFILE PIC</p>
                        <ImageUpload
                          email={musician.email}
                          setImageUrl={setImageUrl}
                          imageUrl={imageUrl}
                        />
                        <p>BIO</p>
                        <FormInput
                          value={musician.description}
                          error={errors.description}
                          register={register("description")}
                        />
                        <p>WEBSITE</p>
                        <FormInput
                          value={musician.websiteUrl}
                          error={errors.websiteUrl}
                          register={register("websiteUrl")}
                        />
                        <p>SOUNDCLOUD</p>
                        <FormInput
                          value={musician.soundCloudUrl}
                          error={errors.soundCloudUrl}
                          register={register("soundCloudUrl")}
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid="c" className="accordion-container">
                      <AccordionItemHeading className="accordion-heading-override">
                        <AccordionItemButton>
                          GENRE AND COLLABS <BsChevronCompactDown size={24} />
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>GENRES</p>
                        <MultiSelectDropDown
                          options={genres}
                          defaultValue={userGenres}
                          placeholder="Select genres"
                          isMulti={true}
                          name="genre"
                          control={control}
                        />
                        <p>INSTRUMENTS</p>
                        <MultiSelectDropDown
                          options={instruments}
                          defaultValue={userInstruments}
                          placeholder="Select instruments"
                          isMulti={true}
                          name="instruments"
                          control={control}
                        />
                        <p>WHO DO YOU WANT TO WORK WITH?</p>
                        <MultiSelectDropDown
                          options={lookingFor}
                          defaultValue={userLookingFor}
                          placeholder="Select instruments"
                          isMulti={true}
                          name="lookingFor"
                          control={control}
                        />
                        <section className="dropdown-div">
                          <div className="select-label">EXPERIENCE</div>
                          <select
                            className="select-dropdown"
                            id="experienceLevel"
                            name="experienceLevel"
                            placeholder="Select your experience level"
                            defaultValue={musician.experienceLevel}
                            {...register("experienceLevel", {
                              required: true,
                            })}
                          >
                            <option className="option-text" value="newbie">
                              Newbie
                            </option>
                            <option className="option-text" value="midway">
                              Midway
                            </option>
                            <option className="option-text" value="expert">
                              Expert
                            </option>
                          </select>
                        </section>
                        <section className="dropdown-div">
                          <div className="select-label">
                            ARE YOU OPEN TO COLLABS?
                          </div>
                          <section>
                            <select
                              className="select-dropdown"
                              id="openToCollaboration"
                              name="openToCollaboration"
                              placeholder="Select..."
                              defaultValue={musician.openToCollaboration}
                              {...register("openToCollaboration", {
                                required: true,
                              })}
                            >
                              <option className="option-text" value="true">
                                Yes
                              </option>
                              <option className="option-text" value="false">
                                No
                              </option>
                            </select>
                          </section>
                        </section>
                        <section className="dropdown-div">
                          <div className="select-label">
                            INTERESTED IN JOINING A BAND?
                          </div>
                          <section>
                            <select
                              className="select-dropdown"
                              id="openToJoiningBand"
                              name="openToJoiningBand"
                              placeholder="Select..."
                              defaultValue={musician.openToJoiningBand}
                              {...register("openToJoiningBand", {
                                required: true,
                              })}
                            >
                              <option className="option-text" value="true">
                                Yes
                              </option>
                              <option className="option-text" value="false">
                                No
                              </option>
                            </select>
                          </section>
                        </section>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                  <Button
                    type="submit"
                    label="SAVE CHANGES"
                    mode="primary"
                    size="medium"
                  />
                </form>
              </Modal.Body>
            </>
          ),
        });
      }
    }
  }, [
    control,
    editProfileGenreInstrumentsData,
    errors.description,
    errors.email,
    errors.firstName,
    errors.lastName,
    errors.soundCloudUrl,
    errors.websiteUrl,
    handleSubmit,
    imageUrl,
    onSubmitEditProfile,
    register,
    setModalState,
    musicianData,
    modalUpdateData,
  ]);

  // band page creation logic
  const [renderCreateBandModal, { data: genreInstrumentsData }] = useLazyQuery(
    GENRESINSTRUMENTS,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        setBandUpdateData(data);
      },
      onError: (error) => {
        setModalState({
          open: true,
          content: (
            <Modal.Body className="solid-background">
              <p> Sorry, we couldn't load filtering options at this time </p>
            </Modal.Body>
          ),
        });
      },
    }
  );

  const [validateBandMembers, { data: userValidationData }] = useLazyQuery(
    VALIDATE_BAND_MEMBERS,
    {
      fetchPolicy: "network-only",
      onCompleted: ({ checkIfMusicianExists }) => {
        console.log("on complete", checkIfMusicianExists);
        const validUsers = checkIfMusicianExists
          .filter((musician) => musician.exists)
          .map((musician) => {
            return musician.id;
          });

        if (validUsers) {
          setValidBandMembers([...validBandMembers, ...validUsers]);
        }
      },
    }
  );

  let invalidUsers = [];
  if (userValidationData) {
    console.log("data from server", userValidationData);
    const filteredInvalidUsers = userValidationData.checkIfMusicianExists.filter(
      (musician) => !musician.exists
    );

    invalidUsers = filteredInvalidUsers.map((invalidUser) => invalidUser.email);
    console.log("invalid users", invalidUsers);
  }

  const validateMembers = useCallback(() => {
    const membersInput = $("#membersInput").val();

    if (!membersInput) {
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

  const [createBand] = useMutation(CREATE_BAND, {
    onCompleted: (data) => {
      const bandId = data.createBand.id;

      setModalState({
        open: true,
        content: (
          <>
            <Modal.Header className="solid-background" closeButton>
              <Modal.Title>Create a new band</Modal.Title>
            </Modal.Header>
            <Modal.Body className="solid-background">
              <p>Band created successfully</p>
            </Modal.Body>
          </>
        ),
      });

      setTimeout(() => {
        redirectToPage(`/bands/${bandId}`);
      }, 1500);
    },
    onError: () => {
      setModalState({
        open: true,
        content: (
          <>
            <Modal.Header className="solid-background" closeButton>
              <Modal.Title>Create a new band</Modal.Title>
            </Modal.Header>
            <Modal.Body className="solid-background">
              <p className="regular-text">
                Sorry, we currently experiencing some difficulties and could not
                create your band at this time.
              </p>
              <p className="regular-text">Please try again later.</p>
            </Modal.Body>
          </>
        ),
      });
    },
  });

  const onSubmit = useCallback(
    (formData) => {
      let openToMembers;
      let lookingFor;

      if (formData.lookingFor) {
        openToMembers = true;
        lookingFor = formData.lookingFor;
      } else if (!formData.lookingFor || formData.lookingFor[0] === false) {
        openToMembers = false;
        lookingFor = [];
      }

      formData.numberOfMembers = parseFloat(formData.numberOfMembers);
      formData.openToCollaboration = formData.openToCollaboration = "true"
        ? true
        : false;

      createBand({
        variables: {
          createBandInput: {
            ...formData,
            imageUrl: imageUrlBand,
            openToMembers,
            musicians: validBandMembers,
            lookingFor,
          },
        },
      });
    },
    [createBand, validBandMembers, imageUrlBand]
  );

  const { data: gigsData, loading: gigsLoading, error: gigsError } = useQuery(
    GIGS,
    {
      variables: {
        gigsFilters: {
          musician: musicianId,
        },
      },
    }
  );

  const {
    data: bandsData,
    loading: bandsLoading,
    error: bandsError,
  } = useQuery(BANDS, {
    variables: {
      bandsFilters: {
        musician: musicianId,
      },
    },
  });

  useEffect(() => {
    if (genreInstrumentsData) {
      const serverGenres = genreInstrumentsData.genres.map((genre) => {
        return {
          value: genre.id,
          label: genre.name.charAt(0).toUpperCase() + genre.name.slice(1),
        };
      });

      const serverInstruments = genreInstrumentsData.instruments.map(
        (instrument) => {
          return {
            value: instrument.id,
            label:
              instrument.name.charAt(0).toUpperCase() +
              instrument.name.slice(1),
          };
        }
      );

      const serverLookingFor = genreInstrumentsData.instruments.map(
        (instrument) => {
          return {
            value: instrument.id,
            label:
              instrument.role.charAt(0).toUpperCase() +
              instrument.role.slice(1),
          };
        }
      );
      serverLookingFor.unshift({ label: "Not looking atm", value: false });

      setBandUpdateData(null);
      const x = bandUpdateData;

      setModalState({
        open: true,
        content: (
          <>
            <Modal.Header className="solid-background" closeButton>
              <Modal.Title>Create a new band</Modal.Title>
            </Modal.Header>
            <Modal.Body className="solid-background">
              <form onSubmit={handleSubmit2(onSubmit)}>
                <Accordion preExpanded={["a"]}>
                  <AccordionItem uuid="a" className="accordion-container">
                    <AccordionItemHeading className="accordion-heading-override">
                      <AccordionItemButton>
                        THE BASICS <BsChevronCompactDown size={24} />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>BAND NAME</p>
                      <FormInput
                        placeholder="Band Name"
                        error={errors2.name}
                        register={register2("name")}
                        required={true}
                      />
                      <p>QUICK OVERVIEW</p>
                      <FormInput
                        placeholder="Brief description"
                        error={errors2.description}
                        register={register2("description")}
                        required={true}
                      />
                      <p>NUMBER OF MEMBERS</p>
                      <FormInput
                        placeholder="Members"
                        error={errors2.numberOfMembers}
                        register={register2("numberOfMembers", {
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
                        register={register2("musicians")}
                        placeholder="Members"
                        error={errors2.numberOfMembers}
                        id="membersInput"
                        onChange={(e) => {
                          validateMembers(e);
                        }}
                        onBlur={(e) => {
                          validateMembers(e);
                        }}
                      />
                      {invalidUsers.length > 0 && (
                        <p className="small-text regular-text p-yellow">
                          {" "}
                          We couldn't find Bandmatch profiles for the following
                          users: {invalidUsers.join(", ")} .
                        </p>
                      )}
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

                      <p>LOCATION</p>

                      <section className="dropdown-div py-3">
                        <select
                          className="select-dropdown"
                          id="location"
                          name="location"
                          placeholder="Select your location"
                          {...register2("location", { required: true })}
                        >
                          {locationOptions.map((location) => {
                            return (
                              <option
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

                      <p>MUSIC GENRE</p>
                      <MultiSelectDropDown
                        options={serverGenres}
                        placeholder="Select your genre(s)"
                        isMulti={true}
                        name="genre"
                        control={control2}
                        required={true}
                      />
                      <p>EXPERIENCE</p>
                      <section className="dropdown-div py-3">
                        <select
                          className="select-dropdown"
                          id="experienceLevel"
                          name="experienceLevel"
                          placeholder="Select your experience level"
                          {...register2("experienceLevel", {
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

                      <p>INSTRUMENTS</p>
                      <MultiSelectDropDown
                        options={serverInstruments}
                        placeholder="Band instruments"
                        isMulti={true}
                        name="instruments"
                        control={control2}
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
                        placeholder="Soundcloud url"
                        error={errors.soundCloudUrl}
                        register={register2("soundCloudUrl", {
                          required: false,
                        })}
                      />
                      <p>WEBSITE</p>
                      <FormInput
                        placeholder="Website url"
                        error={errors.websiteUrl}
                        register={register2("websiteUrl", {
                          required: false,
                        })}
                      />
                      <p>ARE YOU OPEN TO COLLABS?</p>
                      <section className="dropdown-div py-3">
                        <select
                          className="select-dropdown"
                          id="openToCollaboration"
                          name="openToCollaboration"
                          placeholder="Select your experience level"
                          {...register2("openToCollaboration", {
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
                        options={serverLookingFor}
                        placeholder="Musician type..."
                        isMulti={true}
                        name="lookingFor"
                        control={control2}
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
    control,
    errors.soundCloudUrl,
    errors.websiteUrl,
    errors2.description,
    errors2.imageUrl,
    errors2.location,
    errors2.name,
    errors2.numberOfMembers,
    genreInstrumentsData,
    handleSubmit2,
    onSubmit,
    register2,
    setModalState,
    validateMembers,
    control2,
    imageUrlBand,
    state.user.email,
    bandUpdateData,
    setBandUpdateData,
  ]);

  let bands;
  if (bandsData) {
    bands = bandsData.bands.map((band) => {
      let bandGenres = [];
      let bandInstruments = [];
      let bandLookingFor = [];

      band.genre.forEach((genre) => {
        bandGenres.push(genre.name);
      });

      band.instruments.forEach((instrument) => {
        bandInstruments.push(instrument.name);
      });

      band.lookingFor.forEach((looking) => {
        bandLookingFor.push(looking.role);
      });

      return {
        ...band,
        type: "band",
        genre: bandGenres,
        instruments: bandInstruments,
        lookingFor: bandLookingFor,
      };
    });
  }

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="see-through-background-90 error-container">
          <p className="regular-text">
            Sorry, we could not load information at this time.
          </p>
          <p className="regular-text">Please try again later.</p>
          <Button
            label="RETURN HOME"
            mode="primary"
            size="medium"
            onClick={redirectToHomepage}
          />
        </div>
      </div>
    );
  }

  if (musicianData) {
    const musician = musicianData.musicianUser;

    const name = musician.firstName + " " + musician.lastName;
    const openTo = () => {
      if (musician.openToCollaboration && musician.openToJoiningBand) {
        return "OPEN TO COLLABORATION | OPEN TO JOINING A BAND";
      } else if (musician.openToCollaboration && !musician.openToJoiningBand) {
        return "OPEN TO COLLABORATION";
      } else if (!musician.openToCollaboration && musician.openToJoiningBand) {
        return "OPEN TO JOINING A BAND";
      } else {
        return "";
      }
    };
    let genres = [];
    let instruments = [];
    let lookingFor = [];
    musician.genre.forEach((genre) => {
      genres.push(genre.name);
    });
    musician.instruments.forEach((instrument) => {
      instruments.push(instrument.name);
    });
    musician.lookingFor.forEach((looking) => {
      lookingFor.push(looking.role);
    });

    const redirectToPage = (event) => {
      const page = event.currentTarget.id;

      window.location.replace(`/${page}`);
    };

    return (
      <div className="profile-container">
        <div className="p-2"></div>
        {myProfile ? (
          <div className="see-through-background-90 text-align-center profile-title-div">
            <Title
              type="profile"
              text="MY PROFILE"
              myProfile={myProfile}
              onClick={renderEditProfileModal}
            />
            <div className="create-band-button ">
              <Button
                label="CREATE A BAND"
                mode="primary"
                size="medium"
                onClick={renderCreateBandModal}
              />
            </div>
          </div>
        ) : (
          <div className="see-through-background-90 text-align-center profile-title-div">
            <p className="title mb-2 pt-2 fs-1">{name}</p>
            <p className="mb-3">{openTo()}</p>

            <p className="p-yellow mt-2 text-limit-one-line">
              LOOKING FOR:{" "}
              <span className="looking-for">{lookingFor.join(" | ")}</span>
            </p>
          </div>
        )}
        <ProfileInfo
          imageUrl={musician.imageUrl}
          name={name}
          instruments={instruments}
          genre={genres}
          openTo={openTo()}
          description={musician.description}
          experienceLevel={musician.experienceLevel}
          lookingFor={lookingFor}
          soundCloudUrl={musician.soundCloudUrl}
          myProfile={myProfile}
          location={musician.location}
        />
        {musicianData && musician.soundCloudUrl && (
          <SoundCloudWidget soundCloudUrl={musician.soundCloudUrl} />
        )}

        <div className="see-through-background-90 text-align-center">
          {myProfile ? (
            <Title type="profile" text="MY GIGS" />
          ) : (
            <p className="title mb-2 pt-2 fs-1">{musician.firstName}'s GIGS</p>
          )}

          {gigsLoading && <LoadingSpinner />}

          {gigsError && (
            <p className="regular-text pb-20">
              Sorry, we couldn't load gigs at this time.
            </p>
          )}

          {gigsData && gigsData.gigs.length ? (
            <div className="cards-container">
              {constructGigCards(gigsData.gigs)}
            </div>
          ) : myProfile && !gigsError ? (
            <div className="no-gigs-bands-container">
              <div>
                <p className="mb-2 fs-3">You have no gigs</p>
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
            !gigsError && (
              <div className="no-gigs-bands-container">
                <p className="mb-3 fs-3">
                  {`${musician.firstName} ${musician.lastName}`} has no gigs
                </p>
              </div>
            )
          )}
        </div>

        <div className="see-through-background-90 text-align-center">
          {myProfile ? (
            <Title type="profile" text="MY BANDS" />
          ) : (
            <p className="title mb-2 pt-2 fs-1">{musician.firstName}'s BANDS</p>
          )}

          {bandsLoading && <LoadingSpinner />}

          <div className="cards-container">
            {bandsData && bandsData.bands.length > 0 && (
              <div className="cards-container">
                {constructPerformerCards(bands, "shortened")}
              </div>
            )}

            {bandsError && (
              <p className="regular-text pb-20">
                Sorry, we couldn't load gigs at this time.
              </p>
            )}

            {(myProfile && !bandsData) ||
              (myProfile && bandsData.bands.length === 0 && (
                <div className="no-gigs-bands-container">
                  <div>
                    <p className="mb-2 fs-3">You have no bands</p>
                  </div>
                  <div>
                    <Button
                      label="FIND A BAND"
                      mode="primary"
                      size="medium"
                      onClick={redirectToPage}
                      buttonId="assemble"
                    />
                  </div>
                </div>
              ))}

            {(!myProfile && !bandsData) ||
              (!myProfile && bandsData.bands.length === 0 && (
                <div className="no-gigs-bands-container">
                  <p className="mb-3 fs-3">
                    {`${musician.firstName} ${musician.lastName}`} has no bands
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
};

export default MusicianProfile;
