import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import constructCards from "../../utils/costructCards";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1401 },
    items: 6,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 5,
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
  const cardComponents = constructCards(cards, "shortened");

  return (
    <Carousel
      infinite={true}
      itemClass="carousel-item-padding-40-px"
      containerClass="carousel-container"
      responsive={responsive}
    >
      {cardComponents}
    </Carousel>
  );
};

export default CardsCarousel;
