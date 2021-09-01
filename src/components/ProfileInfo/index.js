import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FaComment } from "react-icons/fa";
import { GrSoundcloud } from "react-icons/gr";
import { Modal } from "react-bootstrap";

import { useModal } from "../../contexts/ModalProvider";
import { useUserContext } from "../../contexts/UserProvider";
import { CREATE_MESSAGE } from "../../graphql/mutations";
import Title from "../Title";

import "./ProfileInfo.css";
import Button from "../Button";

const ProfileInfo = (props) => {
  const { state } = useUserContext();

  const { setModalState, modalState } = useModal();

  const { register, handleSubmit } = useForm();

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
              <div className="py-3">To: {props.name && props.name}</div>
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

  return (
    <div className="profile-strip">
      <div
        className="profile-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
          backgroundPosition: "center center",
        }}
      >
        <div className="image-overlay">
          <div className="profile-preview-image-overlay-item">
            {props.experienceLevel}
          </div>
        </div>
      </div>

      <div className="musician-info-div text-center">
        {props.myProfile && <p className="title mb-2">{props.name}</p>}
        {props.location && <p className="mb-3">Location: {props.location}</p>}
        {props.instruments && (
          <p className="p-yellow pb-2 ">
            Instrument(s): {props.instruments.join(" | ")}
          </p>
        )}
        {props.genre && (
          <p className="p-yellow pb-2 text-limit-one-line">
            Genre(s): {props.genre.join(" | ")}
          </p>
        )}

        {props.websiteUrl && (
          <a href={props.websiteUrl} className="mb-3">
            {props.websiteUrl}
          </a>
        )}

        {props.openTo && props.myProfile && (
          <p className="mb-3">{props.openTo}</p>
        )}

        <div>{props.description}</div>

        {props.myProfile && props.lookingFor && props.lookingFor.length && (
          <p className="p-yellow mt-2 text-limit-one-line">
            LOOKING FOR:{" "}
            <span className="looking-for">{props.lookingFor.join(" | ")}</span>
          </p>
        )}
        <div className="profile-icon-container mt-4">
          <div className="message-icon">
            <FaComment size={24} onClick={showMessageModal} />
          </div>
          {props.soundCloudUrl && (
            <a target="_blank" rel="noreferrer" href={props.soundCloudUrl}>
              <GrSoundcloud size={32} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
