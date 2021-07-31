import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Routes from "./Routes";
import NavigationBar from "./components/NavigationBar";
import UserProvider from "./contexts/UserProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL || "http://localhost:4000/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Router>
          <NavigationBar />
          <Routes />
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
