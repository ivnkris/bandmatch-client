import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import AssembleCard from "../AssembleCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CardsCarousel = ({ cards }) => {
  const cardComponents = cards.map((card, index) => {
    return (
      <AssembleCard
        type={card.type}
        name={card.name}
        imageUrl={card.imageUrl}
        instruments={card.instruments}
        lookingFor={card.lookingFor}
        key={index}
      />
    );
  });

  return (
    <div>
      <Carousel responsive={responsive}>{cardComponents}</Carousel>
    </div>
  );
};

export default CardsCarousel;
