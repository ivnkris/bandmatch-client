import "../../App.css";
import "./FilterStrip.css";

import Button from "../Button/index";

const FilterStrip = (props) => {
  return (
    <div className="filter-strip-container see-through-background-90">
      <div className="filter-strip-elements-container gutter">
        <p className="title">{props.title}</p>
        <Button label="FILTER" size="small" mode="secondary" />
      </div>
    </div>
  );
};

export default FilterStrip;
