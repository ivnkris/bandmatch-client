import Button from "../../components/Button";

const Error500 = () => {
  return (
    <div className="error-page-container">
      <div className="move-center">
        <div>
          <h1>
            <span className="larger-text">Oops!</span> Sorry, something went
            wrong.
          </h1>
        </div>
        <p className="title regular-text mt-3">
          We apologies and are fixing the problem,
        </p>
        <p className="title regular-text">please try again at a later stage.</p>
        <p className="title regular-text mt-5">Click below to go home</p>
        <a href="/">
          <Button label="Home" size="medium" mode="primary" />
        </a>
      </div>
    </div>
  );
};

export default Error500;
