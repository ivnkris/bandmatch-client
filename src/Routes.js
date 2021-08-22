import { Switch, Route, Redirect } from "react-router-dom";

import { useUserContext } from "./contexts/UserProvider";
import Assemble from "./pages/Assemble";
import BandProfile from "./pages/BandProfile/index.js";
import Collaborate from "./pages/Collaborate";
import Gig from "./pages/Gig";
import EditBand from "./pages/EditBand";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login/index";
import MusicianProfile from "./pages/MusicianProfile";
import SignUp from "./pages/SignUp/index";
import MusicianSignup from "./pages/MusicianSignup";
import VenueSignup from "./pages/VenueSignup";
import Venue from "./pages/Venue";

const Routes = () => {
  const { state } = useUserContext();

  return (
    <Switch>
      <Route exact path="/assemble">
        <Assemble />
        {/* {state.user ? <Assemble /> : <Redirect to="/login" />} */}
      </Route>
      <Route exact path="/collaborate">
        {state.user ? <Collaborate /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/gig">
        <Gig />
        {/* {state.user ? <Gig /> : <Redirect to="/login" />} */}
      </Route>
      <Route exact path="/edit-band">
        {state.user ? <EditBand /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/edit-profile">
        {state.user ? <EditProfile /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/inbox">
        {state.user ? <Inbox /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        {!state.user ? <Login /> : <Redirect to="/profile" />}
      </Route>
      <Route exact path="/signup">
        {!state.user ? <SignUp /> : <Redirect to="/profile" />}
      </Route>
      <Route exact path="/signup/musician">
        {!state.user ? <MusicianSignup /> : <Redirect to="/profile" />}
      </Route>
      <Route exact path="/signup/venue">
        {!state.user ? <VenueSignup /> : <Redirect to="/profile" />}
      </Route>
      <Route exact path="/profile/:id">
        {state.user ? <MusicianProfile /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/bands/:id">
        {state.user ? <BandProfile /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/venues/:id">
        {state.user ? <Venue /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
