import MusicianSignupForm from "../../components/MusicianSignupForm";

import "./MusicianSignup.css";

const MusicianSignup = (props) => {
  return (
    <div className="signup-container">
      <div className="form-div">
        <MusicianSignupForm />
      </div>
    </div>
  );
};

export default MusicianSignup;
