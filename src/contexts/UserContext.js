import { createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ currentUser, onLogin, onLogout, ...rest }) => {
  return (
    <UserContext.Provider
      value={{ currentUser, onLogin, onLogout }}
      {...rest}
    />
  );
};

export default UserProvider;
