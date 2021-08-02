import Select, { components } from "react-select";
import { useForm } from "react-hook-form";

import "./MultipleSelectInput.css";

const MultiValueContainer = (props) => {
  return <components.MultiValueContainer {...props} />;
};

const MultipleSelectInput = ({
  options,
  name,
  placeholder,
  label,
  register,
}) => {
  const { setValue } = useForm();

  return (
    <div className="multiSelect">
      <h3 className="question">{label}</h3>
      <Select
        className="select-form"
        name={name}
        options={options}
        {...register}
        components={{ MultiValueContainer }}
        closeMenuOnSelect={false}
        isMulti
        placeholder={placeholder}
        getOptionValue={(option) => option.value}
        onChange={(option) => {
          setValue(name, option.value);
        }}
      />
    </div>
  );
};

export default MultipleSelectInput;
