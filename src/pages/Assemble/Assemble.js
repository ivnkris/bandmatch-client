import "./Assemble.css";
import CardsCarousel from "../../components/Carousel";
import Header from "../../components/Header";

const cards = [
  {
    type: "band",
    name: "Cool Kids",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    instruments: ["drums", "keyboard", "vocalist", "guitar"],
    lookingFor: ["bassist, keyboardist"],
  },
  {
    type: "band",
    name: "Cool Kids",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    instruments: ["drums", "keyboard", "vocalist", "guitar"],
    lookingFor: ["bassist, keyboardist"],
  },
  {
    type: "musician",
    firstName: "Beth",
    lastName: "Forter",
    imageUrl:
      "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    genre: "ROCK",
    experienceLevel: "newbie",
    instruments: ["singer", "guitarist"],
    lookingFor: ["drummer", "keyboardist"],
  },
  {
    type: "band",
    name: "Cool Kids",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    instruments: ["drums", "keyboard", "vocalist", "guitar"],
    lookingFor: ["bassist, keyboardist"],
  },
  {
    type: "band",
    name: "Cool Kids",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wJTIwYmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    instruments: ["drums", "keyboard", "vocalist", "guitar"],
    lookingFor: ["bassist, keyboardist"],
  },
  {
    type: "musician",
    firstName: "Beth",
    lastName: "Forter",
    imageUrl:
      "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    genre: "ROCK",
    experienceLevel: "newbie",
    instruments: ["singer", "guitarist"],
    lookingFor: ["drummer", "keyboardist"],
  },
  {
    type: "musician",
    firstName: "Beth",
    lastName: "Forter",
    imageUrl:
      "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    genre: "ROCK",
    experienceLevel: "newbie",
    instruments: ["singer", "guitarist"],
    lookingFor: ["drummer", "keyboardist"],
  },
  {
    type: "musician",
    firstName: "Beth",
    lastName: "Forter",
    imageUrl:
      "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    genre: "ROCK",
    experienceLevel: "newbie",
    instruments: ["singer", "guitarist"],
    lookingFor: ["drummer", "keyboardist"],
  },
];

const Assemble = (props) => {
  return (
    <div className="assemble-container">
      <Header title="Create, complete or join a band" />
      <CardsCarousel cards={cards} />
    </div>
  );
};

export default Assemble;
