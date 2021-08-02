import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Routes from "./Routes";
import NavigationBar from "./components/NavigationBar";
import UserProvider from "./contexts/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URL || "http://localhost:4000/",
});

const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: {
      ...headers,
      authorization: user ? `Bearer ${user.token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const onLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser();

    window.location.assign("/login");
  };
  return (
    <ApolloProvider client={client}>
      <UserProvider
        currentUser={currentUser}
        onLogin={onLogin}
        onLogout={onLogout}
      >
        <Router>
          <NavigationBar />
          <Routes />
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
