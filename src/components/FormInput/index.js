import classNames from "classnames";

import "./FormInput.css";

const FormInput = ({
  placeholder,
  additionalClassNames,
  type = "text",
  error,
  register,
  required,
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
        {...register}
        required={required}
      />
    </div>
  );
};

export default FormInput;
