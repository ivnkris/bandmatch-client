import Select from "react-select";
import { Controller } from "react-hook-form";

import "./MultiSelectDropdown.css";

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
        <h3 className="question">{label}</h3>
      </div>
      <Controller
        render={({ field: { onChange, value, ref } }) => (
          <Select
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
  );
};
export default MultiSelectDropDown;
