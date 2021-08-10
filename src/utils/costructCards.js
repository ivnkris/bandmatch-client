import AssembleCard from "../components/AssembleCard";

const constructCards = (cards, version = "extended") => {
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

export default constructCards;
