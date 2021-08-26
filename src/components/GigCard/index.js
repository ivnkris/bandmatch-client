import moment from "moment";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Modal } from "react-bootstrap";
import { useModal } from "../../contexts/ModalProvider";
import { GIG_PREVIEW } from "../../graphql/queries";
import Button from "../Button";
import { CREATE_GIG_REQUEST, DELETE_GIG } from "../../graphql/mutations";
import { useUserContext } from "../../contexts/UserProvider";
import Title from "../Title";

const GigCard = (props) => {
  const { setModalState, modalState } = useModal();
  const { state } = useUserContext();
  const postcode = props.postcode.replace(/[+]/g, " ");
  const date = moment(props.dateTime * 1)
    .local()
    .format("DD-MM-YYYY HH:mm");
  const [gigRequestQuery] = useMutation(CREATE_GIG_REQUEST, {
    onCompleted: (data) => {
      setModalState({
        open: true,
        content: (
          <>
            <Modal.Body className="solid-background messaging-modal">
              <Title text="REQUEST SENT" type="profile" />
              <div className="text-center pt-3 mx-3">SUCCESS!</div>
              <div className="text-center pt-4 mx-5">
                Your request has been sent to the venue owner. They will review
                your request and contact you if you are successful!
              </div>
            </Modal.Body>
          </>
        ),
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const sendGigRequest = async (event) => {
    await gigRequestQuery({
      variables: {
        createGigRequestInput: {
          id: props.gigId,
          performer: { musician: state.user.id },
        },
      },
    });
  };
  const [deleteGigQuery] = useMutation(DELETE_GIG);
  const sendDeleteRequest = async (event) => {
    await deleteGigQuery({
      variables: {
        deleteGigInput: {
          id: props.gigId,
        },
      },
    });
  };

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
          const date = moment(gig.dateTime * 1)
            .local()
            .format("DD-MM-YYYY HH:mm");

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
                  <div>{gig.venue.postcode}</div>
                  <p className="p-yellow pb-2 pb-10">PAY: £{gig.fee}</p>
                  <p className="regular-text">{gig.description}</p>
                  <div
                    className="flex-apart profile-preview-icons-container"
                    user={gig.id}
                  >
                    <Button
                      label="REQUEST"
                      onClick={sendGigRequest}
                      size="small"
                      mode="primary"
                    />
                    <a href={`venues/${gig.venue.id}`}>
                      <Button label="VENUE" size="small" mode="secondary" />
                    </a>
                  </div>
                </Modal.Body>
              </>
            ),
          });
        }
      }
    },
    onError: () => {
      setModalState({
        open: true,
        content: (
          <Modal.Body className="solid-background">
            <p>
              Sorry, we couldn't load information about this gig at this time.
              Please try again later.
            </p>
          </Modal.Body>
        ),
      });
    },
  });

  return (
    <div className="card-container card-container-shortened mx-3">
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
        {state.user.name === props.venueName ? (
          <Button
            label="DELETE"
            onClick={sendDeleteRequest}
            size="small"
            mode="delete"
          />
        ) : (
          <Button
            label="REQUEST"
            onClick={sendGigRequest}
            size="small"
            mode="primary"
          />
        )}
        <Button
          label="MORE INFO"
          size="small"
          mode="secondary"
          onClick={() => getGigInfo({ variables: { gigId: props.gigId } })}
        />
      </div>
    </div>
  );
};

export default GigCard;
