import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { useCallback } from "react";
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
import { CREATE_BAND } from "../../graphql/mutations";
import {
  constructGigCards,
  constructPerformerCards,
} from "../../utils/constructCards";
import { useUserContext } from "../../contexts/UserProvider";
import { GENRESINSTRUMENTS, MUSICIAN_USER } from "../../graphql/queries";

import "./MusicianProfile.css";
import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import Title from "../../components/Title";
import Button from "../../components/Button";
import MultiSelectDropDown from "../../components/MultiSelectDropdown";
import FormInput from "../../components/FormInput";

const MusicianProfile = (props) => {
  const { state } = useUserContext();
  const { id } = useParams();
  const { modalState, setModalState } = useModal();

  let history = useHistory();

  const redirectToBandPage = (url) => {
    setModalState({
      open: false,
    });

    history.push(url);
  };

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
              <p>Band created succcessfully</p>
            </Modal.Body>
          </>
        ),
      });

      setTimeout(() => {
        redirectToBandPage(`/bands/${bandId}`);
      }, 1500);
    },
    onError: (error) => {
      //TO DO: handle error
    },
  });

  const onSubmit = useCallback(
    (formData) => {
      formData.numberOfMembers = parseFloat(formData.numberOfMembers);
      formData.openToCollaboration = formData.openToCollaboration = "true"
        ? true
        : false;
      const openToMembers = formData.lookingFor.length > 0 ? true : false;
      console.log(formData, openToMembers);

      createBand({
        variables: {
          createBandInput: { ...formData, openToMembers: openToMembers },
        },
      });
      setModalState({
        open: false,
        content: null,
      });
    },
    [setModalState]
  );

  const validateMembers = (event) => {
    const membersInput = $("#membersInput").val();

    if (!membersInput) {
      return;
    }
    const formattedMembers = membersInput.split(" ");
    console.log("validating members", formattedMembers);
  };

  const myProfile = id === state.user.id;

  const [renderCreateBandModal] = useLazyQuery(GENRESINSTRUMENTS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (!modalState.open) {
        if (!data) {
          setModalState({
            open: true,
            content: (
              <Modal.Body className="solid-background">
                <p> Sorry, we couldn't load filtering options at this time </p>
              </Modal.Body>
            ),
          });
        } else {
          const serverGenres = data.genres.map((genre) => {
            return {
              value: genre.id,
              label: genre.name.charAt(0).toUpperCase() + genre.name.slice(1),
            };
          });

          const serverInstruments = data.instruments.map((instrument) => {
            return {
              value: instrument.id,
              label:
                instrument.name.charAt(0).toUpperCase() +
                instrument.name.slice(1),
            };
          });

          const serverLookingFor = data.instruments.map((instrument) => {
            return {
              value: instrument.id,
              label:
                instrument.role.charAt(0).toUpperCase() +
                instrument.role.slice(1),
            };
          });

          const members = register("members", { required: true });
          members.onBlur = validateMembers();

          setModalState({
            open: true,
            content: (
              <>
                <Modal.Header className="solid-background" closeButton>
                  <Modal.Title>Create a new band</Modal.Title>
                </Modal.Header>
                <Modal.Body className="solid-background">
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                            error={errors.name}
                            register={register("name")}
                          />
                          <p>QUICK OVERVIEW</p>
                          <FormInput
                            placeholder="Brief description"
                            error={errors.description}
                            register={register("description")}
                          />
                          <p>MUSIC GENRE</p>
                          <MultiSelectDropDown
                            options={serverGenres}
                            placeholder="Select your genre(s)"
                            isMulti={true}
                            name="genre"
                            control={control}
                          />
                          <p>EXPERIENCE</p>
                          <section className="dropdown-div">
                            <select
                              className="select-dropdown"
                              id="experienceLevel"
                              name="experienceLevel"
                              placeholder="Select your experience level"
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
                          <FormInput
                            placeholder="Profile Image"
                            error={errors.imageUrl}
                            register={register("imageUrl", { required: true })}
                          />
                          <p>LOCATION</p>
                          <FormInput
                            placeholder="City"
                            error={errors.location}
                            register={register("location", { required: true })}
                          />
                          <p>NUMBER OF MEMBERS</p>
                          <FormInput
                            placeholder="Members"
                            error={errors.numberOfMembers}
                            register={register(
                              "numberOfMembers",
                              {
                                required: true,
                              },
                              { pattern: /\d/g }
                            )}
                            required={true}
                          />
                          <p>MEMBERS</p>
                          <FormInput
                            register={register("members", {
                              required: true,
                            })}
                            placeholder="Members"
                            error={errors.numberOfMembers}
                            required={true}
                            id="membersInput"
                            onChange={(e) => {
                              validateMembers(e);
                            }}
                            onBlur={(e) => {
                              validateMembers(e);
                            }}
                          />
                          <p>INSTRUMENTS</p>
                          <MultiSelectDropDown
                            options={serverInstruments}
                            placeholder="Band instruments"
                            isMulti={true}
                            name="instruments"
                            control={control}
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
                            register={register("soundCloudUrl", {
                              required: false,
                            })}
                          />
                          <p>WEBSITE</p>
                          <FormInput
                            placeholder="Website url"
                            error={errors.websiteUrl}
                            register={register("websiteUrl", {
                              required: false,
                            })}
                          />
                          <p>ARE YOU OPEN TO COLLABS?</p>
                          <section className="dropdown-div">
                            <select
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
                          <p>LOOKING FOR NEW MEMBERS?</p>
                          <p className="regular-text small-text">
                            If you're looking for new members, please select
                            from the options below. Ottherwise, leave the field
                            blank.
                          </p>
                          <MultiSelectDropDown
                            options={serverLookingFor}
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
      }
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
  });

  const { data: musicianData, loading, error } = useQuery(MUSICIAN_USER, {
    variables: {
      musicianUserId: id,
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

  if (musicianData) {
    const musician = musicianData.musicianUser;
    // console.log(musician);
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
    return (
      <div className="profile-container">
        <div className="p-2"></div>
        {myProfile && (
          <div className="see-through-background-90 text-align-center profile-title-div">
            <Title text="MY PROFILE" />
            <div className="create-band-button ">
              <Button
                label="CREATE A BAND"
                mode="primary"
                size="medium"
                onClick={renderCreateBandModal}
              />
            </div>
          </div>
        )}
        <ProfileInfo
          imageUrl={musician.imageUrl}
          name={name}
          instruments={instruments}
          genre={genres}
          openTo={openTo()}
          description={musician.description}
          lookingFor={lookingFor}
          soundCloudUrl={musician.soundCloudUrl}
        />
        <SoundCloudWidget soundCloudUrl={musician.soundCloudUrl} />

        <div className="see-through-background-90 text-align-center">
          {myProfile ? (
            <Title text="MY GIGS" />
          ) : (
            <p className="title mb-2 pt-2 fs-1">{musician.firstName}'s GIGS</p>
          )}

          <div className="cards-container">
            {/* {constructGigCards(musician.gigs)} */}
          </div>
        </div>

        <div className="see-through-background-90 text-align-center">
          {myProfile ? (
            <Title text="MY BANDS" />
          ) : (
            <p className="title mb-2 pt-2 fs-1">{musician.firstName}'s BANDS</p>
          )}

          <div className="cards-container">
            {/* {constructPerformerCards(musician.bands, "shortened")} */}
          </div>
        </div>
      </div>
    );
  }
};

export default MusicianProfile;
