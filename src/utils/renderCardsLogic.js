const renderCards = (data) => {
  const { musicians } = data;

  let bands = [];

  if (data.bands) {
    bands = data.bands.map((band) => {
      return {
        ...band,
        type: "band",
      };
    });
  }

  // takes whichever array is larger to not limit cards rendered
  const cardsLength =
    musicians.length > bands.length ? musicians.length : bands.length;

  const newCards = [];

  // for cards length pushes bands first then musicians until the shorter one runs out
  for (let index = 0; index < cardsLength; index++) {
    if (bands[index]) {
      newCards.push(bands[index]);
    }

    if (musicians[index]) {
      newCards.push(musicians[index]);
    }
  }

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

  return cards;
};

export default renderCards;
