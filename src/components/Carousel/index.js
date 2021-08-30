import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { constructPerformerCards } from "../../utils/constructCards";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1401 },
    items: 6,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1308 },
    items: 5,
    slidesToSlide: 1,
  },
  largeTablet: {
    breakpoint: { max: 1307, min: 1040 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1039, min: 780 },
    items: 3,
    slidesToSlide: 1,
  },
  largeMobile: {
    breakpoint: { max: 779, min: 526 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 525, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CardsCarousel = ({ cards }) => {
  const cardComponents = constructPerformerCards(cards, "carousel");

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
