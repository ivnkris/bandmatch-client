import React from "react";
import { useQuery } from "@apollo/client";

import "./Assemble.css";
import Header from "../../components/Header";
import CardsCarousel from "../../components/Carousel";
import FilterStrip from "../../components/FilterStrip";
import { constructPerformerCards } from "../../utils/constructCards";
import Button from "../../components/Button";

import { ASSEMBLE, ASSEMBLE_CAROUSEL } from "../../graphql/queries";
import { useUserContext } from "../../contexts/UserProvider";
import renderCards from "../../utils/renderCardsLogic";
import LoadingSpinner from "../../components/LoadingSpinner";

const Assemble = (props) => {
  const { state } = useUserContext();

  const filters = {
    genre: state.userFilters.genre,
    instruments: state.userFilters.instruments,
    lookingFor: state.userFilters.lookingFor,
    experienceLevel: state.userFilters.experienceLevel,
    userType: state.userFilters.userType,
  };

  const {
    data: assembleData,
    loading: assembleLoading,
    error,
    fetchMore,
  } = useQuery(ASSEMBLE, {
    variables: {
      assembleFilters: filters,
      offset: 0,
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data: carouselData,
    loading: carouselLoading,
    error: carouselError,
  } = useQuery(ASSEMBLE_CAROUSEL);

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  if (carouselError) {
    console.log(carouselError);
    return <div>Error</div>;
  }

  let carouselCards;
  if (carouselData) {
    carouselCards = renderCards(carouselData.assemble);
  }

  let assembleCards;
  if (assembleData) {
    assembleCards = renderCards(assembleData.assemble);
  }

  const onLoadMore = async () => {
    console.log("assembleData", assembleData.assemble);
    await fetchMore({
      variables: {
        offset: 1,
        // offset: assembleData.assemble.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log("prev", prev.assemble);
        console.log("fetchMoreResult", fetchMoreResult.assemble);

        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          assemble: [
            ...prev.assemble.bands,
            ...prev.assemble.musicians,
            ...fetchMoreResult.assemble.bands,
            ...fetchMoreResult.assemble.musicians,
          ],
        });
      },
    });
  };

  return (
    <div className="results-page-container">
      <Header className="pt-3" title="Create, complete or join a band" />
      <div className="see-through-background-90 mt-20 ">
        <p className="title gutter">NEW KIDS ON THE BLOCK</p>
        {carouselLoading && <LoadingSpinner />}
        {carouselData && <CardsCarousel cards={carouselCards} />}
      </div>
      <FilterStrip title="FIND YOUR MATCH" />
      <div className="see-through-background-90 text-align-center">
        {assembleLoading && <LoadingSpinner />}
        {assembleData && (
          <div className="cards-container">
            {constructPerformerCards(assembleCards)}
          </div>
        )}
        <Button
          label="LOAD MORE"
          size="medium"
          mode="primary"
          onClick={onLoadMore}
        />
      </div>
    </div>
  );
};

export default Assemble;
