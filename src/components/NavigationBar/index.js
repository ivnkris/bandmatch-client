import { GiHamburgerMenu } from "react-icons/gi";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { isMobile, isBrowser } from "react-device-detect";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/js/bootstrap";

import { useUserContext } from "../../contexts/UserProvider";

import "./NavigationBar.css";

const NavigationBar = (props) => {
  const { state, dispatch } = useUserContext();
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userFilters");
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav id="navbar" className="navbar navbar-expand-lg nav-bar sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand nav-bar-logo-container" href="/">
          <div>BAND MATCH</div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <GiHamburgerMenu />
          </span>
        </button>
        <div
          className="collapse navbar-collapse dropdown-nav"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav nav-links nav-bar-links-container">
            {!state.user && (
              <>
                <a className="nav-link nav-bar-link" href="/assemble">
                  ASSEMBLE
                </a>
                <a className="nav-link nav-bar-link" href="/collaborate">
                  COLLAB
                </a>
                <a className="nav-link nav-bar-link" href="/gig">
                  GIG
                </a>
              </>
            )}

            {state.user && state.user.type === "musician" && (
              <>
                <a className="nav-link nav-bar-link" href="/assemble">
                  ASSEMBLE
                </a>
                <a className="nav-link nav-bar-link" href="/collaborate">
                  COLLAB
                </a>
                <a className="nav-link nav-bar-link" href="/gig">
                  GIG
                </a>
              </>
            )}

            {state.user && state.user.type === "venue" && (
              <>
                <a className="nav-link nav-bar-link" href="/musicians">
                  MUSICIANS
                </a>
                <a className="nav-link nav-bar-link" href="/bands">
                  BANDS
                </a>
                <a className="nav-link nav-bar-link" href="/gig">
                  GIG
                </a>
              </>
            )}

            {!state.user && (
              <a className="nav-link nav-bar-link" href="/login">
                LOGIN
              </a>
            )}

            {state.user && isMobile && (
              <>
                {state.user.type === "venue" && (
                  <a
                    className="nav-link nav-bar-link"
                    href={`/venues/${state.user.id}`}
                  >
                    MY PROFILE
                  </a>
                )}
                {state.user.type !== "venue" && (
                  <a
                    className="nav-link nav-bar-link"
                    href={`/profile/${state.user.id}`}
                  >
                    MY PROFILE
                  </a>
                )}
                {state.user.type === "venue" && (
                  <a
                    className="nav-link nav-bar-link"
                    href={`/venues/${state.user.id}`}
                  >
                    MY PROFILE
                  </a>
                )}
                {state.user.type === "venue" && (
                  <a
                    className="nav-link nav-bar-link"
                    href={`/requests/${state.user.id}`}
                  >
                    MY REQUESTS
                  </a>
                )}
                <a className="nav-link nav-bar-link" href="/inbox">
                  INBOX
                </a>
                <button
                  type="link"
                  className="logout-btn nav-link"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </>
            )}
            {state.user && isBrowser && (
              <DropdownButton
                variant="secondary"
                title={
                  capitalizeFirstLetter(state.user.firstName) +
                  " " +
                  capitalizeFirstLetter(state.user.lastName)
                }
                align="end"
                className="nav-menu-button"
              >
                {state.user.type === "venue" && (
                  <Dropdown.Item
                    className="dropdown-menu-item"
                    href={`/venues/${state.user.id}`}
                  >
                    My Profile
                  </Dropdown.Item>
                )}
                {state.user.type !== "venue" && (
                  <Dropdown.Item
                    className="dropdown-menu-item"
                    href={`/profile/${state.user.id}`}
                  >
                    My Profile
                  </Dropdown.Item>
                )}
                {state.user.type === "venue" && (
                  <Dropdown.Item
                    className="dropdown-menu-item"
                    href={`/requests/${state.user.id}`}
                  >
                    My Requests
                  </Dropdown.Item>
                )}
                <Dropdown.Item href="/inbox">Inbox</Dropdown.Item>
                <Dropdown.Divider />
                <button
                  type="link"
                  className="logout-btn nav-link"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </DropdownButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
