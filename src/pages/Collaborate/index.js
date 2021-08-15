import React from "react";
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
  } = useQuery(COLLABORATE, {
    variables: {
      collaborateFilters: filters,
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
    carouselCards = renderCards(carouselData.collaborate);
  }

  let collaborateCards;
  if (collaborateData) {
    collaborateCards = renderCards(collaborateData.collaborate);
  }

  return (
    <div className="collaborate-container">
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

        <Button label="LOAD MORE" size="medium" mode="primary" />
      </div>
    </div>
  );
};

export default Collaborate;
