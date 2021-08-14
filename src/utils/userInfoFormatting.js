const generateGenres = (genres) => {
  return genres.map((genre) => {
    return genre.name;
  });
};

const generateInstruments = (instruments) => {
  return instruments.map((instrument) => {
    return instrument.name;
  });
};

const generateLookingFor = (instruments) => {
  return instruments.map((instrument) => {
    return instrument.role;
  });
};

module.exports = {
  generateGenres,
  generateInstruments,
  generateLookingFor,
};
