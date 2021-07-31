import React, { useState } from "react";
import Select, { components } from "react-select";

import "./MultipleSelectInput.css";

const MultiValueContainer = (props) => {
  return <components.MultiValueContainer {...props} />;
};

const MultipleSelectInput = (
  register,
  options,
  name,
  onChange,
  label,
  placeholder
) => {
  return (
    <div className="multiSelect">
      <h3 className="question">{label} What do you play?</h3>
      <Select
        name={name}
        options={options}
        {...register}
        components={{ MultiValueContainer }}
        closeMenuOnSelect={false}
        isMulti
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default MultipleSelectInput;
