import SignUpForm from "../../components/SignUpForm";
import "./SignUp.css";

const SignUp = (props) => {
  return (
    <div className="signup-container">
      <div className="form-div">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
