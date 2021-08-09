import React, { useState } from "react";

import "../../App.css";
import "./FilterStrip.css";

import Button from "../Button/index";
import FilterModal from "../FilterModal";

const FilterStrip = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="filter-strip-container see-through-background-90">
      <div className="filter-strip-elements-container gutter">
        <p className="title">{props.title}</p>
        <Button
          label="FILTER"
          size="small"
          mode="secondary"
          onClick={() => setModalShow(true)}
        />
      </div>
      <FilterModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default FilterStrip;
