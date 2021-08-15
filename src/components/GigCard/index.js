import Button from "../Button";

const GigCard = (props) => {
  return (
    <div className="card-container card-container-shortened">
      <div
        className="card-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
        }}
      ></div>
      <div>
        <h3 className="title text-limit-one-line"> {props.title} </h3>
        <p> {props.dateTime} </p>
        <p>
          {props.genre} GIG @ {props.venueName} {props.postcode}
        </p>
      </div>
      <div id={props.gigId}>
        <Button
          label="REQUEST"
          onClick={() => console.log("request")}
          size="medium"
          mode="primary"
        />
        <a href={`venues/venueid`}>
          <Button label="VENUE" size="medium" mode="secondary" />
        </a>
      </div>
    </div>
  );
};

export default GigCard;
