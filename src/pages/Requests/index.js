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
			gigRequestsId: state.user.id,
		},
		onError: (error) => {
			console.log(error);
		},
		// pollInterval: 500,
		onCompleted: (data) => {
			console.log(data);
		},
	});

	const filteredData = [];

	if (data) {
		data.gigRequests.map((gig) => {
			gig.performers.map((performer) => {
				if (performer.band) {
					const performerData = {
						bandId: performer.band,
						name: performer.bandDetails.name,
						imageUrl: performer.bandDetails.imageUrl,
						gigId: gig.id,
						gigName: gig.title,
						dateTime: gig.dateTime,
					};
					filteredData.push(performerData);
				} else if (performer.musician) {
					const performerData = {
						musicianId: performer.musician,
						firstName: performer.musicianDetails.firstName,
						lastName: performer.musicianDetails.lastName,
						imageUrl: performer.musicianDetails.imageUrl,
						gigId: gig.id,
						gigName: gig.title,
						dateTime: gig.dateTime,
					};
					filteredData.push(performerData);
				}
			});
		});
	}

	return (
		<div className="results-page-container d-flex justify-content-center">
			<div className="request-cards-container see-through-background-90">
				<Title text="MY REQUESTS" type="section" />
				{data &&
					filteredData.map((performer) => {
						return (
							<RequestCard
								firstName={performer.firstName || null}
								lastName={performer.lastName || null}
								name={performer.name || null}
								gigName={performer.gigName}
								imageUrl={performer.imageUrl}
								musicianId={performer.musicianId || null}
								bandId={performer.bandId || null}
								gigId={performer.gigId}
								dateTime={performer.dateTime}
								key={performer.gigId + performer.imageUrl}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Requests;
