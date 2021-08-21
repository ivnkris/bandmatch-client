import VenueSignupForm from "../../components/VenueSignupForm";

import "./VenueSignup.css";

const VenueSignup = (props) => {
  return (
    <div className="signup-container">
      <div className="form-div">
        <VenueSignupForm />
      </div>
    </div>
  );
};

export default VenueSignup;
