import { useQuery } from "@apollo/client";

import Header from "../../components/Header";
import CardsCarousel from "../../components/Carousel";
import FilterStrip from "../../components/FilterStrip";
import { constructPerformerCards } from "../../utils/constructCards";

import LoadingSpinner from "../../components/LoadingSpinner";
import { BANDS } from "../../graphql/queries";

const Bands = () => {
  const { data: bandsData, loading: bandsLoading } = useQuery(BANDS);

  let bandCards;
  if (bandsData) {
    bandCards = bandsData.bands.map((card) => {
      let genres = [];
      let instruments = [];
      let lookingFor = [];

      card.genre.forEach((genre) => {
        genres.push(genre.name);
      });

      card.instruments.forEach((instrument) => {
        instruments.push(instrument.name);
      });

      card.lookingFor.forEach((looking) => {
        lookingFor.push(looking.role);
      });
      return {
        ...card,
        genre: genres,
        instruments,
        lookingFor,
      };
    });
  }

  return (
    <div className="results-page-container">
      <Header className="pt-3" title="Create, complete or join a band" />
      <div className="see-through-background-90 mt-20 ">
        <p className="title gutter">NEW KIDS ON THE BLOCK</p>
        {bandsLoading && <LoadingSpinner />}
        {bandsData && <CardsCarousel cards={bandCards} />}
      </div>
      <FilterStrip title="FIND YOUR MATCH" />
      <div className="see-through-background-90 text-align-center main-cards-container">
        {bandsLoading && <LoadingSpinner />}
        {bandsData && (
          <div className="cards-container">
            {constructPerformerCards(bandCards)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bands;
