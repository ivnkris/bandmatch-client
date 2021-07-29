import React, { useState } from "react";
import Select, { components } from "react-select";

const options = [
  { value: "rock", label: "Rock" },
  { value: "pop", label: "Pop" },
  { value: "jazz", label: "Jazz" },
  { value: "country", label: "Country" },
  { value: "blues", label: "Blues" },
  { value: "hiphop", label: "Hip-hop" },
];

const MultiValueContainer = (props) => {
  return <components.MultiValueContainer {...props} />;
};

const MultipleSelectInput = (register) => {
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
