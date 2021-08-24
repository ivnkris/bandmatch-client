import Button from "../Button";
import "./RequestCard.css";

const RequestCard = (props) => {
	return (
		<div className="musician-request-card solid-background d-flex align-items-center">
			<div className="musician-image-container">
				<img
					className="musician-request-image"
					src="https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
					alt="This is just a thing."
				/>
			</div>
			<div className="musician-info-container text-center">
				<p>Musician Name</p>
				<p>Gig Name</p>
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
