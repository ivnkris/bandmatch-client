import React, { useState } from "react";
import { FaComment, FaUser } from "react-icons/fa";
import $ from "jquery";

import "../../App.css";
import "./AssembleCard.css";
import getInstrumentIcons from "../../utils/getInstrumentIcons";
import ProfilePreviewModal from "../ProfilePreviewModal";

const AssembleCard = (props) => {
  const [user, setUser] = React.useState({
    imageUrl: "",
    experienceLevel: "",
    name: "",
    description: "",
    instruments: [],
    genre: [],
    id: 123,
    soundCloudUrl: "",
    type: "",
  });
  const [modalShow, setModalShow] = React.useState(false);

  const renderProfilePreviewModal = (event) => {
    // get user id from card
    const userId = $(event.target).parent().attr("user");
    console.log("This is the chosen one", userId);

    // get user id from card

    // fake user info for now
    setUser({
      imageUrl:
        "https://images.unsplash.com/photo-1523456752049-9ccb633594bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      experienceLevel: "NEWBIE",
      firstName: "Dominika",
      lastName: "Pietrzak",
      description: "This is my super interesting description",
      instruments: ["guitar", "vocalist"],
      genre: ["rock", "punk"],
      id: 123,
      soundCloudUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/oliviarodrigo/good-4-u-1",
      type: "musician",
    });

    setModalShow(true);
  };

  const title =
    props.type === "band" ? props.name : props.firstName + " " + props.lastName;
  const instruments = getInstrumentIcons(props.instruments);

  return (
    <div
      className={[`card-container-${props.version}`, `card-container`].join(
        " "
      )}
      key={JSON.stringify(props.uuid)}
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
        <div className="icon-container" user={props.userId}>
          <FaComment size={24} onClick={props.handleMessage} />
          <FaUser size={24} onClick={renderProfilePreviewModal} />
          <ProfilePreviewModal
            user={user}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AssembleCard;
