import React from "react";
import { FaComment, FaUser } from "react-icons/fa";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import "../../App.css";
import "./AssembleCard.css";
import { Modal } from "react-bootstrap";

import getInstrumentIcons from "../../utils/getInstrumentIcons";
import { BAND_PREVIEW, MUSICIAN_PREVIEW } from "../../graphql/queries";
import { useModal } from "../../contexts/ModalProvider";
import Button from "../Button/index";
import SoundCloudWidget from "../SoundCloudWidget";
import {
  generateGenres,
  generateInstruments,
} from "../../utils/userInfoFormatting";
import { useUserContext } from "../../contexts/UserProvider";
import { CREATE_MESSAGE } from "../../graphql/mutations";
import Title from "../Title";

const AssembleCard = (props) => {
  const { state } = useUserContext();

  const { setModalState, modalState } = useModal();

  const { register, handleSubmit } = useForm();

  const [getBandInfo] = useLazyQuery(BAND_PREVIEW, {
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
          const band = data.band;
          setModalState({
            open: true,
            content: (
              <>
                <Modal.Body className="solid-background text-align-center">
                  <div
                    className="profile-preview-image"
                    style={{
                      backgroundImage: "url(" + band.imageUrl + ")",
                      backgroundPosition: "center center",
                    }}
                  >
                    <div className="image-overlay">
                      <div className="profile-preview-image-overlay-item">
                        {band.experienceLevel}
                      </div>
                    </div>
                  </div>
                  <h5 className="title">{band.name}</h5>
                  <p className="p-yellow pb-2">
                    {generateGenres(band.genre).join(" / ")}
                  </p>
                  <div className="pb-10">
                    {generateInstruments(band.instruments).join(" ")}
                  </div>
                  <p className="regular-text">{band.description}</p>
                  <div
                    className="flex-apart profile-preview-icons-container"
                    user={band.id}
                  >
                    <Button
                      label="MESSAGE"
                      onClick={showMessageModal}
                      size="medium"
                      mode="primary"
                    />
                    <a href={`/bands/${band.id}`}>
                      <Button label="PROFILE" size="medium" mode="secondary" />
                    </a>
                  </div>
                  <div>
                    <SoundCloudWidget soundCloudUrl={band.soundCloudUrl} />
                  </div>
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

  const [getMusicianInfo] = useLazyQuery(MUSICIAN_PREVIEW, {
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
          const musician = data.musicianUser;
          const title = musician.firstName + " " + musician.lastName;
          setModalState({
            open: true,
            content: (
              <>
                <Modal.Body className="solid-background text-align-center">
                  <div
                    className="profile-preview-image"
                    style={{
                      backgroundImage: "url(" + musician.imageUrl + ")",
                      backgroundPosition: "center center",
                    }}
                  >
                    <div className="image-overlay">
                      <div className="profile-preview-image-overlay-item">
                        {musician.experienceLevel}
                      </div>
                    </div>
                  </div>
                  <p className="title">{title}</p>

                  <p className="p-yellow pb-2">
                    {generateGenres(musician.genre).join(" / ")}
                  </p>
                  <p className="pb-10">
                    {generateInstruments(musician.instruments).join(" ")}
                  </p>
                  <p className="regular-text">{musician.description}</p>
                  <div
                    className="flex-apart profile-preview-icons-container"
                    user={musician.id}
                  >
                    <Button
                      label="MESSAGE"
                      onClick={showMessageModal}
                      size="medium"
                      mode="primary"
                    />
                    <a href={`profile/${musician.id}`}>
                      <Button label="PROFILE" size="medium" mode="secondary" />
                    </a>
                  </div>
                  <div>
                    <SoundCloudWidget soundCloudUrl={musician.soundCloudUrl} />
                  </div>
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

  const [sendMessageData] = useMutation(CREATE_MESSAGE, {
    onCompleted: () => {
      setModalState({ open: false, content: null });
    },
  });

  const sendMessage = async (formData) => {
    const text = formData.text;
    const senderId = state.user.id;
    const recipientId = props.userId;

    await sendMessageData({
      variables: { createMessageInput: { text, senderId, recipientId } },
    });
  };

  const showMessageModal = () => {
    setModalState({
      open: true,
      content: (
        <>
          <Modal.Body className="solid-background messaging-modal">
            <Title text="MESSAGES" type="profile" />
            <form className="px-5" onSubmit={handleSubmit(sendMessage)}>
              <div className="py-3">
                To:{" "}
                {props.firstName &&
                  props.firstName.charAt(0).toUpperCase() +
                    props.firstName.slice(1)}{" "}
                {props.lastName &&
                  props.lastName.charAt(0).toUpperCase() +
                    props.lastName.slice(1)}
                {props.name && props.name}
              </div>
              <textarea
                className="message-text-area"
                name="text"
                {...register("text", {
                  required: true,
                  shouldUnregister: true,
                })}
                placeholder="Write your message here..."
              ></textarea>
              <div className="text-center">
                <Button
                  type="submit"
                  label="SEND MESSAGE"
                  size="medium"
                  mode="primary"
                />
              </div>
            </form>
          </Modal.Body>
        </>
      ),
    });
  };

  const title =
    props.type === "band" ? props.name : props.firstName + " " + props.lastName;
  const instruments = getInstrumentIcons(props.instruments);

  const userPreview = () => {
    if (props.type === "band") {
      return (
        <FaUser
          size={24}
          onClick={() => getBandInfo({ variables: { bandId: props.userId } })}
        />
      );
    } else {
      return (
        <FaUser
          size={24}
          onClick={() =>
            getMusicianInfo({ variables: { musicianUserId: props.userId } })
          }
        />
      );
    }
  };

  return (
    <div
      className={[`card-container-${props.version}`, `card-container`].join(
        " "
      )}
    >
      <div
        className="card-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
          backgroundPosition: "center center",
        }}
      >
        <div className="image-overlay ">
          <div className="card-image-overlay-item">{props.experienceLevel}</div>
        </div>
      </div>
      <div className="card-body">
        {props.name ? (
          <h3 className="title text-limit-one-line">{props.name}</h3>
        ) : (
          <h3 className="title text-limit-one-line">{title}</h3>
        )}
        <p className="text py-2">{props.location}</p>
        <p className="p-yellow pb-2 text-limit-one-line">
          {props.genre.join("/")}
        </p>
        <p className="card-text-instruments text-limit-one-line">
          {[...instruments]}
        </p>
        {props.version === "extended" && (
          <>
            <p className="p-yellow card-text">LOOKING FOR: </p>
            <p className="text-limit-one-line">
              {props.lookingFor.join(" | ")}
            </p>
          </>
        )}
        <div className="icon-container" user={props.userId} type={props.type}>
          <FaComment size={24} onClick={showMessageModal} />
          {userPreview()}
        </div>
      </div>
    </div>
  );
};

export default AssembleCard;
