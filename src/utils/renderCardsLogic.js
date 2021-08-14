import shuffleArray from "./shuffleArray";

const renderCards = (data) => {
  let bands = {};

  if (data.bands) {
    bands = data.bands.map((band) => {
      return {
        ...band,
        type: "band",
      };
    });
  }
  const newCards = [...data.musicians, ...bands];

  const cards = newCards.map((card) => {
    let genres = [];
    let instruments = [];
    let lookingFor = [];

    card.genre.forEach((genre) => {
      genres.push(genre.name);
    });

    card.instruments.forEach((instrument) => {
      instruments.push(instrument.name);
    });

    card.lookingFor.forEach((looking) => {
      lookingFor.push(looking.role);
    });
    return {
      ...card,
      genre: genres,
      instruments,
      lookingFor,
    };
  });

  return shuffleArray(cards);
};

export default renderCards;
