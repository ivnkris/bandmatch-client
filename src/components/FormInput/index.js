import classNames from "classnames";

import "./FormInput.css";

const FormInput = ({
  placeholder,
  additionalClassNames,
  type = "text",
  error,
  register,
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
      />
    </div>
  );
};

export default FormInput;
