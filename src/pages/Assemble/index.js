import "./Assemble.css";
import Header from "../../components/Header";
import CardsCarousel from "../../components/Carousel";
import FilterStrip from "../../components/FilterStrip";

const cards = [
  {
    type: "band",
    name: "Cool Kids Very Long Name",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    instruments: [
      "drums",
      "keyboard",
      "vocalist",
      "guitar",
      "keyboard",
      "vocalist",
      "guitar",
    ],
    experienceLevel: "newbie",
    genre: ["ROCK", "JAZZ"],
    lookingFor: [
      "bassist",
      "keyboardist",
      "bassist",
      "keyboardist",
      "bassist",
      "keyboardist",
    ],
  },
  {
    type: "musician",
    firstName: "Beth",
    lastName: "Forter",
    genre: ["ROCK", "JAZZ"],
    imageUrl:
      "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    genre: ["ROCK"],
    experienceLevel: "newbie",
    instruments: ["singer", "guitarist"],
    lookingFor: ["drummer", "keyboardist"],
  },
  {
    type: "band",
    name: "Cool Kids Very Long Name",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    instruments: [
      "drums",
      "keyboard",
      "vocalist",
      "guitar",
      "keyboard",
      "vocalist",
      "guitar",
    ],
    experienceLevel: "newbie",
    genre: ["ROCK", "JAZZ"],
    lookingFor: [
      "bassist",
      "keyboardist",
      "bassist",
      "keyboardist",
      "bassist",
      "keyboardist",
    ],
  },
  {
    type: "musician",
    firstName: "Beth",
    lastName: "Forter",
    genre: ["ROCK", "JAZZ"],
    imageUrl:
      "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    genre: ["ROCK"],
    experienceLevel: "newbie",
    instruments: ["singer", "guitarist"],
    lookingFor: ["drummer", "keyboardist"],
  },
  {
    type: "band",
    name: "Cool Kids Very Long Name",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    instruments: [
      "drums",
      "keyboard",
      "vocalist",
      "guitar",
      "keyboard",
      "vocalist",
      "guitar",
    ],
    experienceLevel: "newbie",
    genre: ["ROCK", "JAZZ"],
    lookingFor: [
      "bassist",
      "keyboardist",
      "bassist",
      "keyboardist",
      "bassist",
      "keyboardist",
    ],
  },
  {
    type: "musician",
    firstName: "Beth",
    lastName: "Forter",
    genre: ["ROCK", "JAZZ"],
    imageUrl:
      "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    genre: ["ROCK"],
    experienceLevel: "newbie",
    instruments: ["singer", "guitarist"],
    lookingFor: ["drummer", "keyboardist"],
  },
  {
    type: "band",
    name: "Cool Kids Very Long Name",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    instruments: [
      "drums",
      "keyboard",
      "vocalist",
      "guitar",
      "keyboard",
      "vocalist",
      "guitar",
    ],
    experienceLevel: "newbie",
    genre: ["ROCK", "JAZZ"],
    lookingFor: [
      "bassist",
      "keyboardist",
      "bassist",
      "keyboardist",
      "bassist",
      "keyboardist",
    ],
  },
  {
    type: "musician",
    firstName: "Beth",
    lastName: "Forter",
    genre: ["ROCK", "JAZZ"],
    imageUrl:
      "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    genre: ["ROCK"],
    experienceLevel: "newbie",
    instruments: ["singer", "guitarist"],
    lookingFor: ["drummer", "keyboardist"],
  },
];

const Assemble = (props) => {
  return (
    <div className="assemble-container">
      <Header className="pt-3" title="Create, complete or join a band" />
      <CardsCarousel cards={cards} />
      <FilterStrip title="FIND YOUR MATCH" />
    </div>
  );
};

export default Assemble;
