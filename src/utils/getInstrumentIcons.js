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

  return instruments.map((instrument, index) => {
    if (instrument === "guitar") {
      return <FaGuitar {...props} key={`${instrument}-${index}`} />;
    }

    if (instrument === "drums") {
      return <FaDrum {...props} key={`${instrument}-${index}`} />;
    }

    if (instrument === "singer") {
      return <FaMicrophone {...props} key={`${instrument}-${index}`} />;
    }

    if (instrument === "keyboard") {
      return <GiMusicalKeyboard {...props} key={`${instrument}-${index}`} />;
    }

    if (instrument === "piano") {
      return <GiPianoKeys {...props} key={`${instrument}-${index}`} />;
    }

    if (instrument === "bass") {
      return <GiGuitarBassHead {...props} key={`${instrument}-${index}`} />;
    }

    if (instrument === "saxophone") {
      return <GiSaxophone {...props} key={`${instrument}-${index}`} />;
    }

    if (instrument === "band") {
      return <FaUsers {...props} key={`${instrument}-${index}`} />;
    }

    return <FaUsers {...props} key={`${instrument}-${index}`} />;
  });
};

export default getInstrumentIcons;
