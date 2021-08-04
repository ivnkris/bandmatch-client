import { GiHamburgerMenu } from "react-icons/gi";
import "bootstrap/dist/js/bootstrap";

import { useUserContext } from "../../contexts/UserProvider";

import "./NavigationBar.css";

const NavigationBar = (props) => {
  const { state, dispatch } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
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
            {state.user && (
              <button
                type="link"
                className="logout-btn nav-link nav-bar-link"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
