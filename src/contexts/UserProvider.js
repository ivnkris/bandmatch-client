import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const initialValue = {
    isLoggedIn: false,
  };

  return (
    <UserContext.Provider value={initialValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
