import AboutUsCard from "../../components/AboutUsCard";

import "./AboutUs.css";

import tashaPhoto from "../../images/natasha.jpeg";
import soumeyaPhoto from "../../images/soumeya.jpeg";
import krisPhoto from "../../images/kris.jpg";
import domPhoto from "../../images/dom.jpg";

const AboutUs = () => {
  const ourInfo = [
    {
      name: "Dominika",
      imageUrl: domPhoto,
      githubUrl: "https://github.com/dominikacookies",
      linkedinUrl: "https://www.linkedin.com/in/dominika-pietrzak-183755137/",
      portfolioUrl: "https://dominikacookies.github.io/react-portfolio/",
    },
    {
      name: "Kris",
      imageUrl: krisPhoto,
      githubUrl: "https://github.com/ivnkris",
      linkedinUrl: "https://www.linkedin.com/in/krisztian-ivan-10880478//",
      portfolioUrl: "https://ivnkris.github.io/personal-portfolio-react/#/",
    },
    {
      name: "Natasha",
      imageUrl: tashaPhoto,
      githubUrl: "https://github.com/natasha-mann",
      linkedinUrl: "https://www.linkedin.com/in/natashamann2896//",
      portfolioUrl: "https://natasha-mann.github.io/portfolio-react/",
    },
    {
      name: "Soumeya",
      imageUrl: soumeyaPhoto,
      githubUrl: "https://github.com/SoumeyaH",
      linkedinUrl: "https://www.linkedin.com/in/soumeya-hassan-0a12a5203/",
      portfolioUrl: "https://soumeyah.github.io/react-portfolio/",
    },
  ];

  const cardsToRender = ourInfo.map((info) => {
    return (
      <AboutUsCard
        key={info.name}
        name={info.name}
        imageUrl={info.imageUrl}
        description={info.description}
        githubUrl={info.githubUrl}
        linkedinUrl={info.linkedinUrl}
        portfolioUrl={info.portfolioUrl}
      />
    );
  });
  return (
    <div className="about-us-page-container">
      <h1 className="about-title">Meet the Team</h1>
      <div className="about-cards-container">{cardsToRender}</div>
    </div>
  );
};

export default AboutUs;
