import Select from "react-select";
import { Controller } from "react-hook-form";
// import chroma from "chroma-js";

import "./MultiSelectDropdown.css";

// const colourStyles = {
//   option: (styles, { data }) => {
//     const color = chroma(data.color);
//     return { ...styles, color: "#131313" };
//   },
// };

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
              // styles={colourStyles}
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
