import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import "./Assemble.css";
import Header from "../../components/Header";
import CardsCarousel from "../../components/Carousel";
import FilterStrip from "../../components/FilterStrip";
import constructCards from "../../utils/costructCards";
import Button from "../../components/Button";
import { ASSEMBLE } from "../../graphql/queries";
import shuffleArray from "../../utils/shuffleArray";

const Assemble = (props) => {
  const { data, loading, error } = useQuery(ASSEMBLE);

  if (loading) {
    return <div message="Fetching all blogs"></div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  if (data) {
    const bands = data.assemble.bands.map((band) => {
      return {
        ...band,
        type: "band",
      };
    });
    const newCards = [...data.assemble.musicians, ...bands];

    const cards = newCards.map((card) => {
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
        lookingFor.push(looking.name);
      });
      return {
        ...card,
        genre: genres,
        instruments,
        lookingFor,
      };
    });

    const shuffledCards = shuffleArray(cards);

    return (
      <div className="assemble-container">
        <Header className="pt-3" title="Create, complete or join a band" />
        <div className="see-through-background-90 mt-20 ">
          <p className="title gutter">NEW KIDS ON THE BLOCK</p>
          <CardsCarousel cards={cards} />
        </div>
        <FilterStrip title="FIND YOUR MATCH" />
        <div className="see-through-background-90 text-align-center">
          <div className="cards-container">{constructCards(shuffledCards)}</div>
          <Button label="LOAD MORE" size="medium" mode="primary" />
        </div>
      </div>
    );
  }
};

export default Assemble;
