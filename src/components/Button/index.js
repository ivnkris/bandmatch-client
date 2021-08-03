import "./Button.css";
import "../../App.css";

const Button = ({ label, onClick, size, mode, buttonId, type }) => {
  return (
    <button
      type={type}
      className={[`button--${mode}`, `button--${size}`].join(" ")}
      onClick={onClick}
      id={buttonId}
    >
      {label}
    </button>
  );
};

export default Button;
