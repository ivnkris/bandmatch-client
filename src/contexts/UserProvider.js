import { createContext, useContext, useMemo, useReducer } from "react";

import reducer from "../reducer/reducer";
import getFilters from "../utils/getFilters";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  userFilters: getFilters("userFilters"),
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
