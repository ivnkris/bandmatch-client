import { useCallback } from "react";
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

import { GENRESINSTRUMENTS, VENUE } from "../../graphql/queries";
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

const Venue = () => {
  const { state } = useUserContext();

  const { id: venueId } = useParams();

  const myProfile = venueId === state.user.id;

  const { modalState, setModalState } = useModal();
  const history = useHistory();
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

  const onSubmit = useCallback(async (formData) => {
    formData.fee = formatToTwoDecimals(formData.fee);
    const dateTimeUnformatted = $(".form-control").attr("value");
    const dateTimeFormatted = moment.utc(dateTimeUnformatted).format();

    createGig({
      variables: {
        createGigInput: {
          ...formData,
          venue: venueId,
          dateTime: dateTimeFormatted,
        },
      },
    });
  });

  const [renderCreateGigModal] = useLazyQuery(GENRESINSTRUMENTS, {
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

          const genres = generateDropdownOptions(serverGenres);

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
                          <p>TITLE</p>
                          <FormInput
                            placeholder="Gig title"
                            error={errors.title}
                            register={register("title")}
                          />
                          <p>QUICK OVERVIEW</p>
                          <FormInput
                            placeholder="Brief description"
                            error={errors.description}
                            register={register("description")}
                          />
                          <p>DATE AND TIME</p>
                          <Datetime
                            isValidDate={validateFutureDates}
                            closeOnSelect={true}
                            // dateFormat="DD-MM-YYYY"
                            className="form-control-override"
                          />
                          <p>PAY RATE (£)</p>
                          <FormInput
                            placeholder="Reward for performer"
                            error={errors.fee}
                            register={register(
                              "fee",
                              {
                                required: true,
                              },
                              { pattern: /\d/g }
                            )}
                            required={true}
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
                          <p>MUSIC GENRE</p>
                          <section className="dropdown-div">
                            <select
                              className="select-dropdown"
                              id="genre"
                              name="genre"
                              placeholder="Select your genre"
                              {...register("genre", {
                                required: true,
                              })}
                            >
                              {[...genres]}
                            </select>
                          </section>
                          <p>VENUE PIC</p>
                          <FormInput
                            placeholder="Snap of the venue"
                            error={errors.imageUrl}
                            register={register("imageUrl", { required: true })}
                          />
                          <p>WEBSITE URL</p>
                          <FormInput
                            placeholder="Link to the site?"
                            error={errors.description}
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
      }
    },
  });

  const { data: venueData, loading, error } = useQuery(VENUE, {
    variables: {
      venueId: venueId,
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="profile-container">
      <div className="p-2"></div>
      {myProfile ? (
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
      ) : (
        <div className="see-through-background-90 text-align-center profile-title-div">
          <p className="title mb-2 pt-2 fs-1">{state.user.name}</p>
        </div>
      )}

      {venueData && (
        <ProfileInfo
          imageUrl={venueData.venue.photoUrl}
          name={venueData.venue.name}
          postcode={venueData.venue.postcode}
          description={venueData.venue.description}
          websiteUrl={venueData.venue.websiteUrl}
          myProfile={myProfile}
        />
      )}

      <div className="see-through-background-90 text-align-center">
        <p className="title mb-2 pt-2 fs-1">GIGS at {state.user.name}</p>

        {/* {gigsData && (
          <div className="cards-container">
            {constructGigCards(gigsData.gigs)}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Venue;
