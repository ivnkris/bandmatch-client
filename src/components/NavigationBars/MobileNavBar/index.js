import "./MobileNavBar.css";

const MobileNavBar = (props) => {
  return (
    <div>
      <nav className="nav-bar">
        <ul>
          <div className="mobile-nav-top">
            <li>BAND MATCH</li>
            <li>LOGIN</li>
          </div>
        </ul>
      </nav>
      <br />

      <nav className="nav-bar">
        <ul className="mobile-nav-bottom">
          <li>ASSEMBLE</li>
          <li>COLLAB</li>
          <li>GIG</li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavBar;
