import LoginForm from "../../components/LoginForm";

import "./Login.css";

const Login = (props) => {
  return (
    <div className="login-container">
      <div className="form-div">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
