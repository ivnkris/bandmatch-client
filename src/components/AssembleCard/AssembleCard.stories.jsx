import React from "react";

import AssembleCard from ".";

export default {
  title: "Components/AssembleCard",
  component: AssembleCard,
};

export const Musician = (args) => <AssembleCard {...args} />;

Musician.args = {
  firstName: "Beth",
  lastName: "Forter",
  imageUrl:
    "https://images.unsplash.com/photo-1521417531039-75e91486cc40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJvY2slMjBzaW5nZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  genre: "ROCK",
  experienceLevel: "newbie",
  instruments: ["signer", "guitarist"],
  lookingFor: ["drummer", "keyboardist"],
};

export const Band = (args) => <AssembleCard {...args} />;
