import { useQuery } from "@apollo/client";

import { useUserContext } from "../../contexts/UserProvider";
import Header from "../../components/Header";
import CardsCarousel from "../../components/Carousel";
import FilterStrip from "../../components/FilterStrip";
import { constructPerformerCards } from "../../utils/constructCards";

import LoadingSpinner from "../../components/LoadingSpinner";
import { MUSICIANS } from "../../graphql/queries";

const Musicians = () => {
  const { state } = useUserContext();

  const filters = {
    genre: state.userFilters.genre,
    instruments: state.userFilters.instruments,
    lookingFor: state.userFilters.lookingFor,
    experienceLevel: state.userFilters.experienceLevel,
    userType: state.userFilters.userType,
  };

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
      <Header className="pt-3" title="Create, complete or join a band" />
      <div className="see-through-background-90 mt-20 ">
        <p className="title gutter">NEW KIDS ON THE BLOCK</p>
        {musiciansLoading && <LoadingSpinner />}
        {musiciansData && <CardsCarousel cards={musicianCards} />}
      </div>
      <FilterStrip title="FIND YOUR MATCH" />
      <div className="see-through-background-90 text-align-center main-cards-container">
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
