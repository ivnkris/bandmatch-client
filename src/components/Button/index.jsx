import './Button.css'
import '../../App.css'

const Button = ({label, onClick, size, mode, disappearMobile = ""}) => {
  return (
    <button className={[`button--${mode}`, `button--${size}`, disappearMobile].join(' ')} onClick={onClick}>{label}</button>
  );
};

export default Button;