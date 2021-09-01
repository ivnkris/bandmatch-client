import AboutUsCard from "../../components/AboutUsCard";

import "./AboutUs.css";

import photo from "../../images/alexis-baydoun-bAHwQEJqAb8-unsplash.jpg";

const AboutUs = () => {
  const ourInfo = [
    {
      name: "Dominika",
      imageUrl: photo,
      description: "our long bio about ourselves goes here",
      githubUrl: "https://github.com/dominikacookies",
      linkedinUrl: "https://www.linkedin.com/in/dominika-pietrzak-183755137/",
    },
    {
      name: "Kris",
      imageUrl: "https://unsplash.com/photos/2L-0vnCnzcU",
      description: "our long bio about ourselves goes here",
      githubUrl: "https://github.com/ivnkris",
      linkedinUrl: "https://www.linkedin.com/in/krisztian-ivan-10880478//",
    },
    {
      name: "Natasha",
      imageUrl: "https://unsplash.com/photos/2L-0vnCnzcU",
      description: "our long bio about ourselves goes here",
      githubUrl: "https://github.com/natasha-mann",
      linkedinUrl: "https://www.linkedin.com/in/natashamann2896//",
    },
    {
      name: "Soumeya",
      imageUrl: "https://unsplash.com/photos/2L-0vnCnzcU",
      description: "our long bio about ourselves goes here",
      githubUrl: "https://github.com/SoumeyaH",
      linkedinUrl: "https://www.linkedin.com/in/soumeya-hassan-0a12a5203/",
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
