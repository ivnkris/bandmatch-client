import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Assemble from "./pages/Assemble";
import BandProfile from "./pages/BandProfile";
import Collaborate from "./pages/Collaborate";
import Gig from "./pages/Gig";
import CreateBand from "./pages/CreateBand";
import EditBand from "./pages/EditBand";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login/index";
import MusicianProfile from "./pages/MusicianProfile";
import SignUp from "./pages/SignUp/index";

import { UserContext } from "./contexts/UserContext";

const Routes = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/assemble">
        {currentUser ? <Assemble /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/band">
        {currentUser ? <BandProfile /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/collab">
        {currentUser ? <Collaborate /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/gig">
        {currentUser ? <Gig /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/create-band">
        {currentUser ? <CreateBand /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/edit-band">
        {currentUser ? <EditBand /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/edit-profile">
        {currentUser ? <EditProfile /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/inbox">
        {currentUser ? <Inbox /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        {!currentUser ? <Login /> : <Redirect to="/profile" />}
      </Route>
      <Route exact path="/signup">
        {!currentUser ? <SignUp /> : <Redirect to="/profile" />}
      </Route>
      <Route exact path="/profile">
        {currentUser ? <MusicianProfile /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
