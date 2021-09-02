import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useModal } from "../../contexts/ModalProvider";
import { Modal } from "react-bootstrap";
import { BsChevronCompactDown } from "react-icons/bs";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import $ from "jquery";

import { GENRESINSTRUMENTS, GIGS, VENUE } from "../../graphql/queries";
import { CREATE_GIG } from "../../graphql/mutations";
import formatToTwoDecimals from "../../utils/formatToTwoDecimals";
import generateDropdownOptions from "../../utils/generateDropdownOptions";
import validateFutureDates from "../../utils/validateFutureDates";

import "./Venue.css";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { useUserContext } from "../../contexts/UserProvider";
import Title from "../../components/Title";
import ProfileInfo from "../../components/ProfileInfo";
import { constructGigCards } from "../../utils/constructCards";
import LoadingSpinner from "../../components/LoadingSpinner";
import ImageUpload from "../../components/ImageUpload";

const Venue = () => {
  const { state } = useUserContext();
  const [imageUrl, setImageUrl] = useState();

  const { id: venueId } = useParams();

  const myProfile = venueId === state.user.id;

  const { setModalState } = useModal();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const refreshPage = () => {
    setModalState({
      open: false,
    });

    history.go(0);
  };

  const [createGig] = useMutation(CREATE_GIG, {
    onCompleted: () => {
      setModalState({
        open: true,
        content: (
          <>
            <Modal.Header className="solid-background" closeButton>
              <Modal.Title>Create a new gig</Modal.Title>
            </Modal.Header>
            <Modal.Body className="solid-background">
              <p>Gig created successfully</p>
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
          <>
            <Modal.Header className="solid-background" closeButton>
              <Modal.Title>Create a new gig</Modal.Title>
            </Modal.Header>
            <Modal.Body className="solid-background">
              <p>Sorry, we could not create a new gig at this time.</p>
              <p>Please try again later.</p>
            </Modal.Body>
          </>
        ),
      });
    },
  });

  const onSubmit = useCallback(
    async (formData) => {
      formData.fee = formatToTwoDecimals(formData.fee);
      const dateTimeUnformatted = $(".form-control").attr("value");
      const dateTimeFormatted = moment.utc(dateTimeUnformatted).format();

      createGig({
        variables: {
          createGigInput: {
            ...formData,
            venue: venueId,
            dateTime: dateTimeFormatted,
            imageUrl,
          },
        },
      });
    },
    [createGig, venueId, imageUrl]
  );

  const [renderCreateGigModal, { data: genreInstrumentsData }] = useLazyQuery(
    GENRESINSTRUMENTS,
    {
      fetchPolicy: "network-only",
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

  useEffect(() => {
    if (genreInstrumentsData) {
      const serverGenres = genreInstrumentsData.genres.map((genre) => {
        return {
          value: genre.id,
          label: genre.name.charAt(0).toUpperCase() + genre.name.slice(1),
        };
      });

      const genres = generateDropdownOptions(serverGenres);

      setModalState({
        open: true,
        content: (
          <>
            <Modal.Header className="solid-background" closeButton>
              <Modal.Title>Create a new gig</Modal.Title>
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
                      <p>TITLE *</p>
                      <FormInput
                        placeholder="Gig title"
                        error={errors.title}
                        register={register("title", { required: true })}
                        required={true}
                      />

                      <p>QUICK OVERVIEW *</p>
                      <FormInput
                        placeholder="Brief description"
                        error={errors.description}
                        register={register("description")}
                        required={true}
                      />
                      <p>DATE AND TIME *</p>
                      <Datetime
                        isValidDate={validateFutureDates}
                        closeOnSelect={true}
                        // dateFormat="DD-MM-YYYY"
                        className="form-control-override"
                      />
                      <p>PAY RATE (£) *</p>
                      <FormInput
                        placeholder="Reward for performer"
                        error={errors.fee}
                        register={register("fee", {
                          required: true,
                        })}
                        required={true}
                        type="number"
                      />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid="b" className="accordion-container">
                    <AccordionItemHeading className="accordion-heading-override">
                      <AccordionItemButton>
                        COUPLE SPECIFICS <BsChevronCompactDown size={24} />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>MUSIC GENRE *</p>
                      <section className="dropdown-div py-3">
                        <select
                          className="select-dropdown"
                          id="genre"
                          name="genre"
                          placeholder="Select your genre"
                          {...register("genre", {
                            required: true,
                          })}
                          required={true}
                        >
                          {[...genres]}
                        </select>
                      </section>

                      <p>VENUE PIC</p>

                      <ImageUpload
                        email={state.user.email}
                        setImageUrl={setImageUrl}
                        imageUrl={imageUrl}
                      />
                      <p>WEBSITE URL</p>
                      <FormInput
                        placeholder="Link to the site?"
                        error={errors.websiteUrl}
                        register={register("websiteUrl")}
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
    errors.description,
    errors.fee,
    errors.title,
    errors.websiteUrl,
    genreInstrumentsData,
    handleSubmit,
    imageUrl,
    onSubmit,
    register,
    setModalState,
    state.user.email,
  ]);

  const {
    data: venueData,
    loading: venueLoading,
    error: venueError,
  } = useQuery(VENUE, {
    variables: {
      venueId: venueId,
    },
  });

  const { data: gigsData, loading: gigsLoading, error: gigsError } = useQuery(
    GIGS,
    {
      variables: {
        gigsFilters: {
          venue: venueId,
        },
      },
    }
  );

  const redirectToHomepage = () => {
    setModalState({
      open: false,
    });

    history.push("/");
  };

  let venue;

  if (venueData) {
    venue = venueData.venue;
  }

  if (venueError) {
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

  return (
    <div className="profile-container">
      <div className="p-2"></div>

      {myProfile && venueData && (
        <div className="see-through-background-90 text-align-center profile-title-div">
          <Title type="profile" text="MY VENUE" />
          <div className="create-band-button ">
            <Button
              label="NEW GIG"
              mode="primary"
              size="medium"
              onClick={renderCreateGigModal}
            />
          </div>
        </div>
      )}

      {!myProfile && venueData && (
        <div className="see-through-background-90 text-align-center profile-title-div">
          <p className="title mb-2 pt-2 fs-1">{venue.name}</p>
        </div>
      )}

      {venue && (
        <ProfileInfo
          imageUrl={venue.photoUrl}
          name={venue.name}
          postcode={venue.postcode}
          description={venue.description}
          websiteUrl={venue.websiteUrl}
          myProfile={myProfile}
        />
      )}

      {venueLoading && <LoadingSpinner />}

      <div className="see-through-background-90 text-align-center">
        {venueData && (
          <p className="title mb-2 pt-2 fs-1">GIGS at {venue.name}</p>
        )}

        {gigsData && myProfile && (
          <div className="cards-container">
            {constructGigCards(gigsData.gigs, "x", "venue")}
          </div>
        )}

        {gigsData && !myProfile && (
          <div className="cards-container">
            {constructGigCards(gigsData.gigs)}
          </div>
        )}

        {gigsLoading && <LoadingSpinner />}

        {!myProfile && !gigsData && venueData && (
          <div className="no-gigs-bands-container">
            <p className="mb-3 fs-3">
              {venueData.venue.name} has no gigs coming up.
            </p>
          </div>
        )}

        {myProfile && !gigsData && (
          <div className="no-gigs-bands-container">
            <div>
              <p className="mb-2 fs-3">You have no gigs</p>
            </div>
            <div>
              <Button
                label="NEW GIG"
                mode="primary"
                size="medium"
                onClick={renderCreateGigModal}
              />
            </div>
          </div>
        )}

        {gigsError && (
          <p className="mb-3 fs-3">
            We can't display any gig information at the moment. Check again
            later!
          </p>
        )}
      </div>
    </div>
  );
};

export default Venue;
