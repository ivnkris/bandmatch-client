import Button from "../Button";
import "./RequestCard.css";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { UPDATE_GIG_REQUEST } from "../../graphql/mutations";

const RequestCard = ({
  firstName,
  lastName,
  name,
  gigName,
  imageUrl,
  musicianId,
  bandId,
  gigId,
  dateTime,
  id,
}) => {
  const [updateGigRequest] = useMutation(UPDATE_GIG_REQUEST);
  const acceptRequest = async (event) => {
    const id = event.target.parentElement.dataset.id;
    await updateGigRequest({
      variables: { updateGigRequestInput: { id, confirmed: "true" } },
    });
  };
  const rejectRequest = async (event) => {
    const id = event.target.parentElement.dataset.id;
    await updateGigRequest({
      variables: {
        updateGigRequestInput: { id, confirmed: "false" },
      },
    });
  };
  return (
    <div className="musician-request-card solid-background d-flex align-items-center">
      <div className="musician-image-container">
        <a href={bandId ? `/bands/${bandId}` : `/profile/${musicianId}`}>
          <img
            className="musician-request-image"
            src={imageUrl}
            alt={bandId ? name : firstName}
          />
        </a>
      </div>
      <div className="musician-info-container text-center">
        <p>{bandId ? name : firstName + " " + lastName}</p>
        <p>{gigName}</p>
        <p>
          {moment(dateTime * 1)
            .local()
            .format("DD-MM-YYYY HH:mm")}
        </p>
      </div>
      <div className="musician-button-container">
        <div className="musician-button" data-id={id}>
          <Button
            mode="primary"
            size="small"
            label="ACCEPT"
            onClick={acceptRequest}
          />
        </div>
        <div className="musician-button" data-id={id}>
          <Button
            mode="secondary"
            size="small"
            label="REJECT"
            onClick={rejectRequest}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
