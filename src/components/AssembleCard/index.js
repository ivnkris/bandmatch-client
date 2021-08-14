import React, { useEffect, useState } from "react";
import { FaComment, FaUser } from "react-icons/fa";
import { useLazyQuery } from "@apollo/client";

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

const AssembleCard = (props) => {
  const { setModalState, modalState } = useModal();

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
                      onClick={() => console.log("msg")}
                      size="medium"
                      mode="primary"
                    />
                    <a href={`bands/${band.id}`}>
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
                      onClick={() => console.log("msg")}
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
        }}
      >
        <div className="image-overlay ">
          <div className="card-image-overlay-item">{props.experienceLevel}</div>
        </div>
      </div>
      <div className="card-body">
        <h3 className="title text-limit-one-line">{title}</h3>
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
          <FaComment size={24} onClick={props.handleMessage} />
          {userPreview()}
        </div>
      </div>
    </div>
  );
};

export default AssembleCard;
