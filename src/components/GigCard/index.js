import { useLazyQuery } from "@apollo/client";
import { Modal } from "react-bootstrap";
import { useModal } from "../../contexts/ModalProvider";
import { GIG_PREVIEW } from "../../graphql/queries";
import Button from "../Button";

const GigCard = (props) => {
  const { setModalState, modalState } = useModal();
  const postcode = props.postcode.replace(/[+]/g, " ");
  const date = new Date(props.dateTime * 1000).toDateString();

  const [getGigInfo] = useLazyQuery(GIG_PREVIEW, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (!modalState.open) {
        if (!data) {
          setModalState({
            open: true,
            content: (
              <Modal.Body className="solid-background">
                <p>
                  Sorry, we couldn't load information about this gig at this
                  time. Please try again later.
                </p>
              </Modal.Body>
            ),
          });
        } else {
          const gig = data.gig;
          const date = new Date(gig.dateTime * 1000).toDateString();

          setModalState({
            open: true,
            content: (
              <>
                <Modal.Body className="solid-background text-align-center">
                  <div
                    className="profile-preview-image"
                    style={{
                      backgroundImage: "url(" + gig.imageUrl + ")",
                    }}
                  >
                    <div className="image-overlay">
                      <div className="profile-preview-image-overlay-item">
                        <p>{gig.genre.name} </p>
                      </div>
                    </div>
                  </div>
                  <h5 className="title">{gig.title}</h5>
                  <p> {date} </p>
                  <p> @ {gig.venue.name} </p>
                  {/* {change to city} */}
                  <div className="pb-10">{gig.venue.postcode}</div>
                  <p className="p-yellow pb-2">PAY: £{gig.fee}</p>
                  <p className="regular-text">{gig.description}</p>
                  <div
                    className="flex-apart profile-preview-icons-container"
                    user={gig.id}
                  >
                    <Button
                      label="REQUEST"
                      onClick={() => console.log("requesting")}
                      size="medium"
                      mode="primary"
                    />
                    <a href={`venues/${gig.venue.id}`}>
                      <Button label="VENUE" size="medium" mode="secondary" />
                    </a>
                  </div>
                </Modal.Body>
              </>
            ),
          });
        }
      }
    },
  });

  return (
    <div className="card-container card-container-shortened">
      <div
        className="card-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
        }}
      >
        <div className="image-overlay">
          <div className="card-image-overlay-item">{props.genre}</div>
        </div>
      </div>
      <div>
        <h3 className="title text-limit-one-line"> {props.title} </h3>
        <p> {date} </p>
        <p className="text-limit-two-line">
          {/* {change to city} */}@ {props.venueName} {postcode}
        </p>
      </div>
      <div id={props.gigId}>
        <Button
          label="REQUEST"
          onClick={() => console.log("request")}
          size="medium"
          mode="primary"
        />
        <Button
          label="MORE INFO"
          size="medium"
          mode="secondary"
          onClick={() => getGigInfo({ variables: { gigId: props.gigId } })}
        />
      </div>
    </div>
  );
};

export default GigCard;
