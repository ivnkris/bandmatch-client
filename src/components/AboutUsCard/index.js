import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { MdWeb } from "react-icons/md";

import "./AboutUsCard.css";

const AboutUsCard = (props) => {
  return (
    <div className="card-container card-container-extended mx-3 about-card">
      <div
        className="about-card-image"
        style={{
          backgroundImage: "url(" + props.imageUrl + ")",
          backgroundPosition: "center center",
        }}
      ></div>
      <div>
        <h3 className="title text-limit-one-line my-3"> {props.name} </h3>
        <p className="text-limit-one-line my-3"> {props.description} </p>
      </div>
      <div className="about-icons-container my-3">
        <a href={props.githubUrl} target="_blank" rel="noopener noreferrer">
          <AiFillGithub size={30} />
        </a>
        <a href={props.linkedinUrl} target="_blank" rel="noopener noreferrer">
          <AiFillLinkedin size={30} />
        </a>
        <a href={props.portfolioUrl} target="_blank" rel="noopener noreferrer">
          <MdWeb size={30} />
        </a>
      </div>
    </div>
  );
};

export default AboutUsCard;
