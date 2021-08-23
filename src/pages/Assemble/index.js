import React, { useState } from "react";
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

  const [hasMoreItems, setHasMoreItems] = useState(true);

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
      bandsOffset: 0,
      musiciansOffset: 0,
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
    await fetchMore({
      variables: {
        bandsOffset: assembleData.assemble.bands.length,
        musiciansOffset: assembleData.assemble.musicians.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        if (
          fetchMoreResult.assemble.bands.length < 2 &&
          fetchMoreResult.assemble.musicians.length < 2
        ) {
          setHasMoreItems(false);
        }

        const result = {
          assemble: {
            bands: [...prev.assemble.bands, ...fetchMoreResult.assemble.bands],
            musicians: [
              ...prev.assemble.musicians,
              ...fetchMoreResult.assemble.musicians,
            ],
          },
        };

        return result;
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
        {hasMoreItems && (
          <Button
            label="LOAD MORE"
            size="medium"
            mode="primary"
            onClick={onLoadMore}
          />
        )}
      </div>
    </div>
  );
};

export default Assemble;
