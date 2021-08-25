import classNames from "classnames";

import "./FormInput.css";

const FormInput = ({
  placeholder,
  additionalClassNames,
  type = "text",
  error,
  register,
  required,
  onBlur,
  id,
  value,
}) => {
  return (
    <div className="form-element">
      <input
        type={type}
        className={classNames("form-input", {
          "form-input--error": error,
          additionalClassNames,
        })}
        placeholder={placeholder}
        defaultValue={value}
        {...register}
        required={required}
        onBlur={onBlur}
        id={id}
      />
    </div>
  );
};

export default FormInput;
