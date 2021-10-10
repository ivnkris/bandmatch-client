import Button from "../../components/Button";

const Error404 = () => {
  return (
    <div className="error-page-container">
      <div className="move-center">
        <div>
          <h1>
            <span className="larger-text">Oops!</span> Sorry, we couldn't find
            that page.
          </h1>
        </div>
        <h4 className="my-5 ms-3">
          Try going back to the previous page or click below to go home.
        </h4>
        <a href="/">
          <Button label="Home" size="medium" mode="primary" />
        </a>
      </div>
    </div>
  );
};

export default Error404;
