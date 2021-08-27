import "../../App.css";
import "./SoundCloudWidget.css";

const SoundCloudWidget = (props) => {
  return (
    <div className="soundCloudWidget-container">
      <div className="soundCloudWidget">
        <iframe
          title="SoundCloud Widget"
          id="sc-widget"
          src={props.soundCloudUrl}
          width="90%"
          height="100px"
          scrolling="no"
          frameBorder="no"
        ></iframe>
      </div>
    </div>
  );
};

export default SoundCloudWidget;
