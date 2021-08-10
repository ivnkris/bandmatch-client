const getFilters = (filterName) => {
  return JSON.parse(localStorage.getItem(`${filterName}`));
};

export default getFilters;
