import "./NavigationBar.css";

const NavigationBar = (props) => {
  return (
    <nav className="nav-bar">
      <ul>
        <div className="nav-bar-logo-container">
          <li>BAND MATCH</li>
        </div>
        <div className="nav-bar-links-container">
          <li>ASSEMBLE</li>
          <li>COLLAB</li>
          <li>GIG</li>
          <li>LOGIN</li>
        </div>
      </ul>
    </nav>
  );
};

export default NavigationBar;
