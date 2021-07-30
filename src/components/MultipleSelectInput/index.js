import React, { useState } from "react";
import Select, { components } from "react-select";

const MultiValueContainer = (props) => {
  return <components.MultiValueContainer {...props} />;
};

const MultipleSelectInput = (register, options) => {
  return (
    <Select
      options={options}
      {...register}
      components={{ MultiValueContainer }}
      closeMenuOnSelect={false}
      isMulti
    />
  );
};

export default MultipleSelectInput;
