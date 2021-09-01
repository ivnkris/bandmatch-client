import { useQuery } from "@apollo/client";
import { valueToObjectRepresentation } from "@apollo/client/utilities";
import AssembleCard from "../components/AssembleCard";
import GigCard from "../components/GigCard";

export const constructPerformerCards = (cards, version = "extended") => {
  const cardsToRender = cards.map((card) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.id !== card.id) {
        return (
          <AssembleCard
            key={`${version}-${card.id}`}
            type={card.type}
            name={card.name}
            firstName={card.firstName}
            lastName={card.lastName}
            imageUrl={card.imageUrl}
            instruments={card.instruments || []}
            lookingFor={card.lookingFor || []}
            genre={card.genre || []}
            experienceLevel={card.experienceLevel}
            version={version}
            userId={card.id}
            location={card.location}
          />
        );
      }
    } else {
      return (
        <AssembleCard
          key={`${version}-${card.id}`}
          type={card.type}
          name={card.name}
          firstName={card.firstName}
          lastName={card.lastName}
          imageUrl={card.imageUrl}
          instruments={card.instruments || []}
          lookingFor={card.lookingFor || []}
          genre={card.genre || []}
          experienceLevel={card.experienceLevel}
          version={version}
          userId={card.id}
          location={card.location}
        />
      );
    }
  });

  return cardsToRender;
};

export const constructGigCards = (gigs, version, userId) => {
  const cardsToRender = gigs.map((gig) => {
    const genre = gig.genre.name;
    const venueName = gig.venue.name;
    const postcode = gig.venue.postcode;

    let performersId;
    let primaryButtonVersion;

    if (userId) {
      if (version === "myAcceptedGig") {
        primaryButtonVersion = version;
        const performanceRequestId = gig.performers.filter(
          (performer) => performer.musician === userId
        );
        performersId = performanceRequestId[0]._id;
      } else {
        const pendingGig = gig.performers.filter(
          (performer) =>
            performer.musician === userId &&
            (performer.confirmed === "pending" || "false")
        );

        const acceptedGig = gig.performers.filter(
          (performer) =>
            performer.musician === userId && performer.confirmed === "true"
        );

        console.log("pending", pendingGig);
        if (!version && pendingGig.length) {
          primaryButtonVersion = "myRequestedGig";
        }

        if (!version && acceptedGig.length) {
          primaryButtonVersion = "myAcceptedGig";
          const performanceRequestId = gig.performers.filter(
            (performer) => performer.musician === userId
          );
          performersId = performanceRequestId[0]._id;
        }
      }
    }

    if (!primaryButtonVersion) {
      primaryButtonVersion = "regular";
    }

    return (
      <GigCard
        key={gig.id}
        title={gig.title}
        genre={genre}
        performersId={performersId}
        imageUrl={gig.imageUrl}
        dateTime={gig.dateTime}
        venueName={venueName}
        postcode={postcode}
        gigId={gig.id}
        fee={gig.fee}
        version={primaryButtonVersion}
      />
    );
  });

  return cardsToRender;
};
