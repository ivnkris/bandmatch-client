import { useQuery } from "@apollo/client";

import "./Assemble.css";
import Header from "../../components/Header";
import CardsCarousel from "../../components/Carousel";
import FilterStrip from "../../components/FilterStrip";
import constructCards from "../../utils/costructCards";
import Button from "../../components/Button";
import { ASSEMBLE } from "../../graphql/queries";

// const cards = [
//   {
//     type: "band",
//     name: "Cool Kids Very Long Name",
//     imageUrl:
//       "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
//     instruments: [
//       "drums",
//       "keyboard",
//       "vocalist",
//       "guitar",
//       "keyboard",
//       "vocalist",
//       "guitar",
//     ],
//     experienceLevel: "newbie",
//     genre: ["ROCK", "JAZZ"],
//     lookingFor: [
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//     ],
//   },
//   {
//     type: "musician",
//     firstName: "Beth",
//     lastName: "Forter",
//     genre: ["ROCK", "JAZZ"],
//     imageUrl:
//       "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//     genre: ["ROCK"],
//     experienceLevel: "newbie",
//     instruments: ["singer", "guitarist"],
//     lookingFor: ["drummer", "keyboardist"],
//   },
//   {
//     type: "band",
//     name: "Cool Kids Very Long Name",
//     imageUrl:
//       "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
//     instruments: [
//       "drums",
//       "keyboard",
//       "vocalist",
//       "guitar",
//       "keyboard",
//       "vocalist",
//       "guitar",
//     ],
//     experienceLevel: "newbie",
//     genre: ["ROCK", "JAZZ"],
//     lookingFor: [
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//     ],
//   },
//   {
//     type: "musician",
//     firstName: "Beth",
//     lastName: "Forter",
//     genre: ["ROCK", "JAZZ"],
//     imageUrl:
//       "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//     genre: ["ROCK"],
//     experienceLevel: "newbie",
//     instruments: ["singer", "guitarist"],
//     lookingFor: ["drummer", "keyboardist"],
//   },
//   {
//     type: "band",
//     name: "Cool Kids Very Long Name",
//     imageUrl:
//       "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
//     instruments: [
//       "drums",
//       "keyboard",
//       "vocalist",
//       "guitar",
//       "keyboard",
//       "vocalist",
//       "guitar",
//     ],
//     experienceLevel: "newbie",
//     genre: ["ROCK", "JAZZ"],
//     lookingFor: [
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//     ],
//   },
//   {
//     type: "musician",
//     firstName: "Beth",
//     lastName: "Forter",
//     genre: ["ROCK", "JAZZ"],
//     imageUrl:
//       "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//     genre: ["ROCK"],
//     experienceLevel: "newbie",
//     instruments: ["singer", "guitarist"],
//     lookingFor: ["drummer", "keyboardist"],
//   },
//   {
//     type: "band",
//     name: "Cool Kids Very Long Name",
//     imageUrl:
//       "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
//     instruments: [
//       "drums",
//       "keyboard",
//       "vocalist",
//       "guitar",
//       "keyboard",
//       "vocalist",
//       "guitar",
//     ],
//     experienceLevel: "newbie",
//     genre: ["ROCK", "JAZZ"],
//     lookingFor: [
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//     ],
//   },
//   {
//     type: "musician",
//     firstName: "Beth",
//     lastName: "Forter",
//     genre: ["ROCK", "JAZZ"],
//     imageUrl:
//       "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//     genre: ["ROCK"],
//     experienceLevel: "newbie",
//     instruments: ["singer", "guitarist"],
//     lookingFor: ["drummer", "keyboardist"],
//   },
//   {
//     type: "band",
//     name: "Cool Kids Very Long Name",
//     imageUrl:
//       "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
//     instruments: [
//       "drums",
//       "keyboard",
//       "vocalist",
//       "guitar",
//       "keyboard",
//       "vocalist",
//       "guitar",
//     ],
//     experienceLevel: "newbie",
//     genre: ["ROCK", "JAZZ"],
//     lookingFor: [
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//     ],
//   },
//   {
//     type: "band",
//     name: "Cool Kids Very Long Name",
//     imageUrl:
//       "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
//     instruments: [
//       "drums",
//       "keyboard",
//       "vocalist",
//       "guitar",
//       "keyboard",
//       "vocalist",
//       "guitar",
//     ],
//     experienceLevel: "newbie",
//     genre: ["ROCK", "JAZZ"],
//     lookingFor: [
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//       "bassist",
//       "keyboardist",
//     ],
//   },
// ];

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

    return (
      <div className="assemble-container">
        <Header className="pt-3" title="Create, complete or join a band" />
        <div className="see-through-background-90 mt-20 ">
          <p className="title gutter">NEW KIDS ON THE BLOCK</p>
          <CardsCarousel cards={cards} />
        </div>
        <FilterStrip title="FIND YOUR MATCH" />
        <div className="see-through-background-90 text-align-center">
          <div className="cards-container">{constructCards(cards)}</div>
          <Button label="LOAD MORE" size="medium" mode="primary" />
        </div>
      </div>
    );
  }
};

export default Assemble;
