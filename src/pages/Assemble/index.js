import React from "react";
import { useQuery } from "@apollo/client";

import "./Assemble.css";
import Header from "../../components/Header";
import CardsCarousel from "../../components/Carousel";
import FilterStrip from "../../components/FilterStrip";
import constructCards from "../../utils/constructCards";
import Button from "../../components/Button";

import { ASSEMBLE, ASSEMBLE_CAROUSEL } from "../../graphql/queries";
import { useUserContext } from "../../contexts/UserProvider";
import renderCards from "../../utils/renderCardsLogic";

const Assemble = (props) => {
  const { state } = useUserContext();

  const filters = {
    genre: state.userFilters.genre,
    instruments: state.userFilters.instruments,
    lookingFor: state.userFilters.lookingFor,
    experienceLevel: state.userFilters.experienceLevel,
    userType: state.userFilters.userType,
  };

  const { data: assembleData, loading, error, fetchMore } = useQuery(ASSEMBLE, {
    variables: {
      assembleFilters: filters,
      offset: 0,
    },
  });

  const {
    data: carouselData,
    loading: carouselLoading,
    error: carouselError,
  } = useQuery(ASSEMBLE_CAROUSEL);

  if (loading) {
    return <div message="Fetching assemble cards..."></div>;
  }

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  if (carouselLoading) {
    return <div message="Fetching carousel..."></div>;
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
    <div className="assemble-container">
      <Header className="pt-3" title="Create, complete or join a band" />
      <div className="see-through-background-90 mt-20 ">
        <p className="title gutter">NEW KIDS ON THE BLOCK</p>
        <CardsCarousel cards={carouselCards} />
      </div>
      <FilterStrip title="FIND YOUR MATCH" />
      {/* <Query query={chaptersQuery}> */}
      <div className="see-through-background-90 text-align-center">
        <div className="cards-container">{constructCards(assembleCards)}</div>
        <Button
          label="LOAD MORE"
          size="medium"
          mode="primary"
          onClick={onLoadMore}
        />
      </div>
      {/* </Query> */}
    </div>
  );
};

export default Assemble;
