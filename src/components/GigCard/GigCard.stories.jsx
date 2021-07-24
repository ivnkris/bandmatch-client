import React from "react";

import GigCard from ".";

const photo =
  "https://images.unsplash.com/photo-1626553785204-5f9b11f38e8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80";

export default {
  title: "Components/GigCard",
  component: GigCard,
};

export const Card = (args) => <GigCard {...args} />;
Card.args = {
  title: "gig title",
  date: "12 DEC 2021",
  time: "18:00",
  genre: "rock",
  venue: "venueName",
  url: photo,
  buttonProps: {
    label: "REQUEST",
    onClick: () => {},
    size: "medium",
    mode: "primary",
    disappearMobile: "disappearMobile",
  },
};
