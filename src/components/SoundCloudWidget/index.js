import "../../App.css";
import "./SoundCloudWidget.css";

const SoundCloudWidget = (props) => {
  return (
    <div className="soundCloudWidget-container">
      <div className="soundCloudWidget">
        <iframe
          id="sc-widget"
          src={props.soundCloudUrl}
          width="350px"
          height="100px"
          scrolling="no"
          frameborder="no"
          title="sound cloud widget"
        ></iframe>
      </div>
    </div>
  );
};

export default SoundCloudWidget;
