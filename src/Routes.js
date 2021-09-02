import { Switch, Route, Redirect } from "react-router-dom";

import { useUserContext } from "./contexts/UserProvider";
import Assemble from "./pages/Assemble";
import BandProfile from "./pages/BandProfile/index.js";
import Collaborate from "./pages/Collaborate";
import Gig from "./pages/Gig";
import EditBand from "./pages/EditBand";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home/index";
import Inbox from "./pages/Inbox/index";
import Login from "./pages/Login/index";
import MusicianProfile from "./pages/MusicianProfile";
import SignUp from "./pages/SignUp/index";
import MusicianSignup from "./pages/MusicianSignup";
import VenueSignup from "./pages/VenueSignup";
import Venue from "./pages/Venue";
import Requests from "./pages/Requests";
import Bands from "./pages/Bands";
import Musicians from "./pages/Musicians";
import AboutUs from "./pages/AboutUs";

const Routes = () => {
  const { state } = useUserContext();

  return (
    <Switch>
      <Route exact path="/assemble">
        {state.user ? <Assemble /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/collaborate">
        {state.user ? <Collaborate /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/gig">
        {state.user ? <Gig /> : <Redirect to="/login" />}
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
        {!state.user && <Login />}
        {state.user && state.user.type === "musician" && (
          <Redirect to={`/profile/${state.user.id}`} />
        )}
        {state.user && state.user.type === "venue" && (
          <Redirect to={`/venues/${state.user.id}`} />
        )}
      </Route>
      <Route exact path="/signup">
        {!state.user && <SignUp />}
        {state.user && state.user.type === "musician" && (
          <Redirect to={`/profile/${state.user.id}`} />
        )}
        {state.user && state.user.type === "venue" && (
          <Redirect to={`/venues/${state.user.id}`} />
        )}
      </Route>
      <Route exact path="/signup/musician">
        {!state.user && <MusicianSignup />}
        {state.user && state.user.type === "musician" && (
          <Redirect to={`/profile/${state.user.id}`} />
        )}
        {state.user && state.user.type === "venue" && (
          <Redirect to={`/venues/${state.user.id}`} />
        )}
      </Route>
      <Route exact path="/signup/venue">
        {!state.user && <VenueSignup />}
        {state.user && state.user.type === "musician" && (
          <Redirect to={`/profile/${state.user.id}`} />
        )}
        {state.user && state.user.type === "venue" && (
          <Redirect to={`/venues/${state.user.id}`} />
        )}
      </Route>
      <Route exact path="/musicians">
        <Musicians />
      </Route>
      <Route exact path="/bands">
        {state.user ? <Bands /> : <Redirect to="/login" />}
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
      <Route exact path="/requests/:id">
        {state.user && state.user.type === "venue" ? (
          <Requests />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route exact path="/about-us">
        <AboutUs />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
