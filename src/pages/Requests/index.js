import { useQuery } from "@apollo/client";
import RequestCard from "../../components/RequestCard";
import Title from "../../components/Title";
import { useUserContext } from "../../contexts/UserProvider";
import { GIG_REQUESTS } from "../../graphql/queries";
import "./Requests.css";

const Requests = (props) => {
	const { state } = useUserContext();

	const { data, loading, error } = useQuery(GIG_REQUESTS, {
		variables: {
			gigRequestsId: "61252dcedd80e105b49c4921",
		},
		onError: (error) => {
			console.log(error);
		},
		// pollInterval: 500,
		onCompleted: (data) => {
			console.log(data);
		},
	});

	if (data) {
		const x = data.gigRequests.map((gig) => {
			gig.performers.map((performer) => {
				if (performer.band) {
					console.log(gig);
				} else if (performer.musician) {
					console.log(gig);
				}
			});
		});
	}

	return (
		<div className="results-page-container d-flex justify-content-center">
			<div className="request-cards-container see-through-background-90">
				<Title text="MY REQUESTS" type="section" />
				{data && <div></div>}
			</div>
		</div>
	);
};

export default Requests;
