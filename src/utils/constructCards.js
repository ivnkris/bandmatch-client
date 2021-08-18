import AssembleCard from "../components/AssembleCard";
import GigCard from "../components/GigCard";

export const constructPerformerCards = (cards, version = "extended") => {
  const cardsToRender = cards.map((card) => {
    return (
      <AssembleCard
        key={`${version}-${card.id}`}
        type={card.type}
        name={card.name}
        firstName={card.firstName}
        lastName={card.lastName}
        imageUrl={card.imageUrl}
        instruments={card.instruments}
        lookingFor={card.lookingFor}
        genre={card.genre}
        experienceLevel={card.experienceLevel}
        version={version}
        userId={card.id}
      />
    );
  });

  return cardsToRender;
};

export const constructGigCards = (gigs) => {
  const cardsToRender = gigs.map((gig) => {
    let genre;
    let venueName;
    let postcode;
    if (gig.genre) {
      genre = gig.genre;
    }
    if (gig.venue) {
      venueName = gig.venue.name;
      postcode = gig.venue.postcode;
    }

    return (
      <GigCard
        key={gig.id}
        title={gig.title}
        genre={genre}
        imageUrl={gig.imageUrl}
        dateTime={gig.dateTime}
        venueName={venueName}
        postcode={postcode}
        gigId={gig.id}
      />
    );
  });

  return cardsToRender;
};
