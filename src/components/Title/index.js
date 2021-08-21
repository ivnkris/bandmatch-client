import "./Title.css";
import "../../App.css";

const Title = ({ text, type }) => {
  return <div className={`${type}-title `}>{text}</div>;
};

export default Title;
