import { useLazyQuery, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { Accordion, AccordionItem } from "react-accessible-accordion";

import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import Title from "../../components/Title";
import Button from "../../components/Button";
import MultiSelectDropDown from "../../components/MultiSelectDropdown";
import FormInput from "../../components/FormInput";

import { useUserContext } from "../../contexts/UserProvider";
import { GENRESINSTRUMENTS, MUSICIAN_USER } from "../../graphql/queries";
import {
  constructGigCards,
  constructPerformerCards,
} from "../../utils/constructCards";
import "./MusicianProfile.css";
import { useModal } from "../../contexts/ModalProvider";

const MusicianProfile = (props) => {
  const { state } = useUserContext();
  const { id } = useParams();
  const { modalState, setModalState } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

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

          const serverLookingfor = data.instruments.map((instrument) => {
            return {
              value: instrument.id,
              label:
                instrument.role.charAt(0).toUpperCase() +
                instrument.role.slice(1),
            };
          });

          setModalState({
            open: true,
            content: (
              <>
                <Modal.Header className="solid-background" closeButton>
                  <Modal.Title>Create a new band</Modal.Title>
                </Modal.Header>
                <Modal.Body className="solid-background">
                  <Accordion preExpanded={["a", "c"]}>
                    <AccordionItem uuid="a">
                      <p>BAND NAME</p>
                      <FormInput
                        placeholder="Band Name"
                        error={errors.name}
                        register={register("name", { required: true })}
                      />
                      <p>QUICK OVERVIEW</p>
                      <FormInput
                        placeholder="Brief description"
                        error={errors.description}
                        register={register("description", { required: true })}
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
                      <MultiSelectDropDown
                        options={[
                          { value: "newbie", label: "newbie" },
                          { value: "midway", label: "midway" },
                          { value: "expert", label: "expert" },
                        ]}
                        placeholder="Select your genre(s)"
                        isMulti={false}
                        name="genre"
                        control={control}
                      />
                    </AccordionItem>
                    <AccordionItem uuid="b">
                      <p>NUMBER OF MEMBERS</p>
                      <FormInput
                        placeholder="Members"
                        error={errors.numberOfMembers}
                        register={register("numberOfMembers", {
                          required: true,
                        })}
                      />
                      <p>INSTRUMENTS</p>
                      <MultiSelectDropDown
                        options={serverInstruments}
                        placeholder="Band instruments"
                        isMulti={true}
                        name="instruments"
                        control={control}
                      />
                      <p>LOCATION</p>
                      <FormInput
                        placeholder="City"
                        error={errors.location}
                        register={register("location", { required: true })}
                      />
                      <p>BAND PIC</p>
                      <FormInput
                        placeholder="Profile Image"
                        error={errors.imageUrl}
                        register={register("imageUrl", { required: true })}
                      />
                    </AccordionItem>
                    <AccordionItem uuid="c">
                      <p>FEATURE SONG</p>
                      <p>Enter the Soundcloud url of your top song</p>
                      <FormInput
                        placeholder="Soundcloud url"
                        error={errors.imageUrl}
                        register={register("soundCloudUrl", {
                          required: false,
                        })}
                      />
                      <p>WEBSITE</p>
                      <FormInput
                        placeholder="Website url"
                        error={errors.imageUrl}
                        register={register("websiteUrl", { required: false })}
                      />
                      <p>OPEN TO COLLABS?</p>
                      <MultiSelectDropDown
                        options={[
                          { value: true, label: "YES" },
                          { value: false, label: "NO" },
                        ]}
                        placeholder="Musician type..."
                        isMulti={true}
                        name="lookingFor"
                        control={control}
                      />
                      <p>LOOKING FOR NEW MEMBERS?</p>
                      <p>
                        If you're looking for new members, please select from
                        the options below. Ottherwise, leave the field blank.
                      </p>
                      <MultiSelectDropDown
                        options={serverLookingfor}
                        placeholder="Musician type..."
                        isMulti={true}
                        name="lookingFor"
                        control={control}
                      />
                    </AccordionItem>
                  </Accordion>
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
    console.log(musician);
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
