import "./Button.css";
import "../../App.css";

const Button = ({ label, onClick, size, mode, buttonId, type, disabled }) => {
  return (
    <button
      type={type}
      className={[`button--${mode}`, `button--${size}`].join(" ")}
      onClick={onClick}
      id={buttonId}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
