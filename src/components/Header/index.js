import "../../App.css";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="see-through-background-90 ">
      <h1 className="header">{props.title}</h1>
    </div>
  );
};

export default Header;
