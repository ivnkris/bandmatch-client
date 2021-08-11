const getFilters = (filterName) => {
  const filters = JSON.parse(localStorage.getItem(`${filterName}`));
  if (filters) {
    return filters;
  } else {
    return {
      genre: [],
      instruments: [],
      lookingFor: [],
      experienceLevel: [],
      userType: [],
    };
  }
};

export default getFilters;
