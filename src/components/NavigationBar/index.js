import { GiHamburgerMenu } from "react-icons/gi";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { isMobile, isBrowser } from "react-device-detect";

import "bootstrap/dist/js/bootstrap";

import { useUserContext } from "../../contexts/UserProvider";

import "./NavigationBar.css";

const NavigationBar = (props) => {
  const { state, dispatch } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav id="navbar" className="navbar navbar-expand-lg nav-bar">
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
            <a className="nav-link nav-bar-link" href="/assemble">
              ASSEMBLE
            </a>
            <a className="nav-link nav-bar-link" href="/collaborate">
              COLLAB
            </a>
            <a className="nav-link nav-bar-link" href="/gig">
              GIG
            </a>
            {!state.user && (
              <a className="nav-link nav-bar-link" href="/login">
                LOGIN
              </a>
            )}

            {state.user && isMobile && (
              <>
                <a className="nav-link nav-bar-link" href="/assemble">
                  MY PROFILE
                </a>
                <a className="nav-link nav-bar-link" href="/collaborate">
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
                <Dropdown.Item className="dropdown-menu-item" href="/profile">
                  My Profile
                </Dropdown.Item>
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
