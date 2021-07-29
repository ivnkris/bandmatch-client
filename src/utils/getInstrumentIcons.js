import { FaGuitar, FaDrum, FaMicrophone } from "react-icons/fa";

const getInstrumentIcons = (instruments) => {
  return instruments.map((instrument) => {
    if (instrument === "guitar") {
      return <FaGuitar size={20} className="instrument-icon" />;
    }
    if (instrument === "drums") {
      return <FaDrum size={20} className="instrument-icon" />;
    }
    if (instrument === "vocalist") {
      return <FaMicrophone size={20} className="instrument-icon" />;
    }
  });
};

export default getInstrumentIcons;
