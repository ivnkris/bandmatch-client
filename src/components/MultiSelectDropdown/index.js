import Select from "react-select";
import { Controller } from "react-hook-form";
// import chroma from "chroma-js";

import "./MultiSelectDropdown.css";

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "grey" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? "grey"
        : isFocused
        ? "grey"
        : null,
      color: isSelected ? "white" : "black",
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? "white" : "grey"),
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "grey",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    backgroundColor: "black",
    color: "white",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    backgroundColor: "black",
    ":hover": {
      backgroundColor: "grey",
    },
  }),
};

const MultiSelectDropDown = ({
  options,
  placeholder,
  isMulti,
  name,
  defaultValue,
  control,
  label,
}) => {
  return (
    <div className="multiSelect">
      <div className="question-div">
        <div className="question">{label}</div>
      </div>
      <div className="black-text">
        <Controller
          render={({ field: { onChange, value, ref } }) => (
            <Select
              styles={colourStyles}
              className="black-text"
              inputRef={ref}
              value={options.filter((option) => value.includes(option.value))}
              onChange={(selectedOptions) =>
                onChange(selectedOptions.map((option) => option.value))
              }
              options={options}
              isMulti={isMulti}
              placeholder={placeholder}
            />
          )}
          name={name}
          defaultValue={defaultValue || ""}
          control={control}
        />
      </div>
    </div>
  );
};
export default MultiSelectDropDown;
