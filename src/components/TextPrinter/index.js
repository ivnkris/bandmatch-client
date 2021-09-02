import "../../App.css";
import "./textPrinter.css";

import Typewriter from "typewriter-effect";

const TextPrinter = (props) => {
  return (
    <div className="text-printer">
      <Typewriter
        options={{
          strings: ["UNLEASH YOUR MUSIC TO THE WORLD"],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default TextPrinter;
