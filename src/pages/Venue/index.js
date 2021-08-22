import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useModal } from "../../contexts/ModalProvider";
import { Modal } from "react-bootstrap";
import { BsChevronCompactDown } from "react-icons/bs";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import { GENRESINSTRUMENTS } from "../../graphql/queries";

import Button from "../../components/Button";
import MultiSelectDropDown from "../../components/MultiSelectDropdown";
import FormInput from "../../components/FormInput";
import { CREATE_GIG } from "../../graphql/mutations";

const Venue = () => {
  const { id: venueId } = useParams();
  const { modalState, setModalState } = useModal();
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

  const [createGig] = useMutation(CREATE_GIG, {
    onCompleted: (data) => {
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
        window.reload();
      }, 1500);
    },
    onError: (error) => {
      //TO DO: handle error
    },
  });

  const onSubmit = useCallback((formData) => {
    console.log("submit", formData);
    formData.fee = parseFloat(formData.fee);
    createGig({
      variables: {
        createGigInput: {
          ...formData,
          venue: venueId,
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
                          <h2> Calendar</h2>
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
                          <MultiSelectDropDown
                            options={serverGenres}
                            placeholder="Music genres"
                            isMulti={true}
                            name="genre"
                            control={control}
                          />
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

  return (
    <div className="solid-background">
      <Button
        label="NEW GIG"
        mode="primary"
        size="medium"
        onClick={renderCreateGigModal}
      />
    </div>
  );
};

export default Venue;
