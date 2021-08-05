import "../../App.css";
import "./FilterStrip.css";

import Button from "../Button/index";

const FilterStrip = (props) => {
  return (
    <div className="filter-strip-container">
      <div className="filter-strip-elements-container">
        <p className="title">{props.title}</p>
        <Button label="FILTER" size="small" mode="secondary" />
      </div>
    </div>
  );
};

export default FilterStrip;
