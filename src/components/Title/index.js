import { RiPencilFill } from "react-icons/ri";

import "./Title.css";
import "../../App.css";

const Title = ({ text, type, myProfile, onClick }) => {
  if (myProfile) {
    return (
      <div className={`${type}-title `}>
        {text} {"  "}
        <RiPencilFill className="icon" onClick={onClick} />
      </div>
    );
  } else {
    return <div className={`${type}-title `}>{text}</div>;
  }
};

export default Title;
