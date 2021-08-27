const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
      userFilters: {
        genre: [],
        instruments: [],
        lookingFor: [],
        experienceLevel: [],
        userType: [],
        location: [],
      },
    };
  }

  if (action.type === "SETUSERFILTERS") {
    return {
      ...state,
      userFilters: action.payload,
    };
  }

  return state;
};

export default reducer;
