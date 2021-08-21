import Button from "../Button";

const GigCard = (props) => {
  const postcode = props.postcode.replace(/[+]/g, " ");
  const date = new Date(props.dateTime * 1000).toDateString();

  return (
    <div className="card-container card-container-shortened">
      <div
        className="card-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
        }}
      >
        <div className="image-overlay">
          <div className="card-image-overlay-item">{props.genre}</div>
        </div>
      </div>
      <div>
        <h3 className="title text-limit-one-line"> {props.title} </h3>
        <p> {date} </p>
        <p className="text-limit-two-line">
          @ {props.venueName} {postcode}
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
