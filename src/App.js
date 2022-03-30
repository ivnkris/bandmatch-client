import { Modal } from "react-bootstrap";
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
import UserProvider from "./contexts/UserProvider";
import ModalProvider, { useModal } from "./contexts/ModalProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Reset.css";
import "./App.css";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URL || "http://localhost:4000/graphql",
  credentials: "same-origin",
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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        assemble: {
          feed: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

const AppModal = () => {
  const { modalState, setModalState } = useModal();

  const onHideModal = () => {
    setModalState({ open: false, content: null });
  };

  return (
    <Modal size="lg" show={modalState.open} onHide={onHideModal} centered>
      {modalState?.content}
    </Modal>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ModalProvider>
          <Router>
            <NavigationBar />
            <Routes />
            <AppModal />
          </Router>
        </ModalProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
