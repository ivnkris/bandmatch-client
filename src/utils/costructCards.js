import { v4 as uuidv4 } from "uuid";

import AssembleCard from "../components/AssembleCard";

const constructCards = (cards, version = "extended") => {
  const cardsToRender = cards.map((card) => {
    const uuid = uuidv4();
    console.log(uuid);
    return (
      <AssembleCard
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
        uuid={uuid}
      />
    );
  });

  return cardsToRender;
};

export default constructCards;
