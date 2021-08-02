import "../../App.css";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header-container">
      <h1 className="header">{props.title}</h1>
    </div>
  );
};

export default Header;
