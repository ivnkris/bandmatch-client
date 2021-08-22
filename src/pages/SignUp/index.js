import "./SignUp.css";

const SignUp = (props) => {
  return (
    <div className="signup-container">
      <div className="form-div">
        <div className="select-user-type-form">
          <div className="text-center user-signup-title">
            WHAT TYPE OF USER ARE YOU?
          </div>
          <div className="user-types-flex-container">
            <div className="user-signup-div">
              <a
                href="/signup/musician"
                className="user-type-button text-center"
                data-type="musician"
              >
                I'M A MUSICIAN
              </a>
              <div className="user-info-text text-center">
                Discover other musicians - form a new band, find collaborators
                and book yourself some gigs!
              </div>
            </div>
            <div className="venue-signup-div">
              <a
                href="/signup/venue"
                className="user-type-button text-center"
                data-type="venue"
              >
                I'M A VENUE OWNER
              </a>
              <div className="user-info-text text-center">
                Advertise your upcoming gigs and try to book some of the hottest
                new talent!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
