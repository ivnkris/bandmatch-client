import { Switch, Route, Redirect } from "react-router-dom";

import Assemble from "./pages/Assemble";
import BandProfile from "./pages/BandProfile";
import Collaborate from "./pages/Collaborate";
import CreateBand from "./pages/CreateBand";
import EditBand from "./pages/EditBand";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import MusicianProfile from "./pages/MusicianProfile";
import SignUp from "./pages/SignUp";

const Routes = () => {
  return (
    <Switch>
      <Route path="/assemble">
        <Assemble />
      </Route>
      <Route path="/band">
        <BandProfile />
      </Route>
      <Route path="/collaborate">
        <Collaborate />
      </Route>
      <Route path="/create-band">
        <CreateBand />
      </Route>
      <Route path="/edit-blog">
        <EditBand />
      </Route>
      <Route path="/edit-profile">
        <EditProfile />
      </Route>
      <Route path="/inbox">
        <Inbox />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/profile">
        <MusicianProfile />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
