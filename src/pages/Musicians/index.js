import { useQuery } from "@apollo/client";

import Header from "../../components/Header";
import CardsCarousel from "../../components/Carousel";
import { constructPerformerCards } from "../../utils/constructCards";

import LoadingSpinner from "../../components/LoadingSpinner";
import { MUSICIANS } from "../../graphql/queries";
import Title from "../../components/Title";

const Musicians = () => {
  const { data: musiciansData, loading: musiciansLoading } = useQuery(
    MUSICIANS
  );

  let musicianCards;
  if (musiciansData) {
    musicianCards = musiciansData.musicians.map((card) => {
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
      <Header className="pt-3" title="FIND YOUR GIG'S PERFECT MUSICIAN" />
      <div className="see-through-background-90 mt-20 ">
        <p className="title gutter">NEW KIDS ON THE BLOCK</p>
        {musiciansLoading && <LoadingSpinner />}
        {musiciansData && <CardsCarousel cards={musicianCards} />}
      </div>
      <div className="see-through-background-90 text-align-center main-cards-container mt-5">
        <Title className="pt-5" text="ALL MUSICIANS" type="section" />
        {musiciansLoading && <LoadingSpinner />}
        {musiciansData && (
          <div className="cards-container">
            {constructPerformerCards(musicianCards)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Musicians;
