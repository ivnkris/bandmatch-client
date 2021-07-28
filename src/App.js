import "bootstrap/dist/css/bootstrap.min.css";
import { StylesProvider } from "@material-ui/core/styles";
import "./App.css";

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="App"></div>;
    </StylesProvider>
  );
}

export default App;
