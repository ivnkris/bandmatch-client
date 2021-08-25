import Button from "../Button";
import "./RequestCard.css";

const RequestCard = ({
	firstName,
	lastName,
	name,
	gigName,
	imageUrl,
	musicianId,
	bandId,
	gigId,
}) => {
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
			</div>
			<div className="musician-button-container">
				<div className="musician-button">
					<Button mode="primary" size="small" label="ACCEPT" />
				</div>
				<div className="musician-button">
					<Button mode="secondary" size="small" label="REJECT" />
				</div>
			</div>
		</div>
	);
};

export default RequestCard;
