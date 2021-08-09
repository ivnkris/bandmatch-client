import { FaGuitar, FaDrum, FaMicrophone, FaUsers } from "react-icons/fa";
import {
  GiMusicalKeyboard,
  GiPianoKeys,
  GiGuitarBassHead,
  GiSaxophone,
} from "react-icons/gi";

const getSize = (instrumentsLength) => {
  if (instrumentsLength > 4) {
    return 16;
  } else {
    return 24;
  }
};

const getInstrumentIcons = (instruments) => {
  const props = {
    size: getSize(instruments.length),
    className: "instrument-icon",
  };

  return instruments.map((instrument) => {
    if (instrument === "guitar") {
      return <FaGuitar {...props} />;
    }

    if (instrument === "drums") {
      return <FaDrum {...props} />;
    }

    if (instrument === "singer") {
      return <FaMicrophone {...props} />;
    }

    if (instrument === "keyboard") {
      return <GiMusicalKeyboard {...props} />;
    }

    if (instrument === "piano") {
      return <GiPianoKeys {...props} />;
    }

    if (instrument === "bass") {
      return <GiGuitarBassHead {...props} />;
    }

    if (instrument === "saxophone") {
      return <GiSaxophone {...props} />;
    }

    if (instrument === "band") {
      return <FaUsers {...props} />;
    }

    return <FaUsers {...props} />;
  });
};

export default getInstrumentIcons;
