import RequestCard from "../../components/RequestCard";
import Title from "../../components/Title";
import "./Requests.css";

const Requests = (props) => {
	return (
		<div className="results-page-container d-flex justify-content-center">
			<div className="request-cards-container see-through-background-90">
				<Title text="MY REQUESTS" type="section" />
				<RequestCard />
				<RequestCard />
			</div>
		</div>
	);
};

export default Requests;
