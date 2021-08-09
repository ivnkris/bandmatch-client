import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { v4 as uuidv4 } from "uuid";

import "./Carousel.css";

import AssembleCard from "../AssembleCard";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1201 },
    items: 6,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CardsCarousel = ({ cards }) => {
  const cardComponents = cards.map((card) => {
    const uuid = uuidv4();
    console.log(uuid);
    return (
      <AssembleCard
        type={card.type}
        name={card.name}
        firstName={card.firstName}
        lastName={card.lastName}
        imageUrl={card.imageUrl}
        instruments={card.instruments}
        lookingFor={card.lookingFor}
        genre={card.genre}
        experienceLevel={card.experienceLevel}
        uuid={uuid}
      />
    );
  });

  return (
    <div className="band-carousel">
      <Carousel
        infinite={true}
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {cardComponents}
      </Carousel>
    </div>
  );
};

export default CardsCarousel;
