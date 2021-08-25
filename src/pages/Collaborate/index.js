import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import "./Collaborate.css";
import Header from "../../components/Header";
import CardsCarousel from "../../components/Carousel";
import FilterStrip from "../../components/FilterStrip";
import { constructPerformerCards } from "../../utils/constructCards";
import Button from "../../components/Button";

import { COLLABORATE, COLLABORATE_CAROUSEL } from "../../graphql/queries";
import { useUserContext } from "../../contexts/UserProvider";
import renderCards from "../../utils/renderCardsLogic";
import LoadingSpinner from "../../components/LoadingSpinner";

const Collaborate = (props) => {
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
    data: collaborateData,
    loading: collaborateLoading,
    error: collaborateError,
    fetchMore,
  } = useQuery(COLLABORATE, {
    variables: {
      collaborateFilters: filters,
      bandsOffset: 0,
      musiciansOffset: 0,
    },
  });

  const {
    data: carouselData,
    loading: carouselLoading,
    error: carouselError,
  } = useQuery(COLLABORATE_CAROUSEL);

  if (collaborateError) {
    console.log(collaborateError);
    return <div>Error</div>;
  }

  if (carouselError) {
    console.log(carouselError);
    return <div>Error</div>;
  }

  let carouselCards;
  if (carouselData) {
    carouselCards = renderCards(carouselData.collaborateCarousel);
  }

  let collaborateCards;
  if (collaborateData) {
    collaborateCards = renderCards(collaborateData.collaborate);
  }

  const onLoadMore = async () => {
    await fetchMore({
      variables: {
        bandsOffset: collaborateData.collaborate.bands.length,
        musiciansOffset: collaborateData.collaborate.musicians.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        if (
          fetchMoreResult.collaborate.bands.length < 2 &&
          fetchMoreResult.collaborate.musicians.length
        ) {
          setHasMoreItems(false);
        }

        const result = {
          collaborate: {
            bands: [
              ...prev.collaborate.bands,
              ...fetchMoreResult.collaborate.bands,
            ],
            musicians: [
              ...prev.collaborate.musicians,
              ...fetchMoreResult.collaborate.musicians,
            ],
          },
        };

        return result;
      },
    });
  };

  return (
    <div className="results-page-container">
      <Header className="pt-3" title="Collaborate with other musicians" />
      <div className="see-through-background-90 mt-20 ">
        <p className="title gutter">NEW KIDS ON THE BLOCK</p>
        {carouselLoading && <LoadingSpinner />}
        {carouselData && <CardsCarousel cards={carouselCards} />}
      </div>
      <FilterStrip title="FIND YOUR COLLABORATORS" />
      <div className="see-through-background-90 text-align-center">
        {collaborateLoading && <LoadingSpinner />}
        {collaborateData && (
          <div className="cards-container">
            {constructPerformerCards(collaborateCards)}
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

export default Collaborate;
