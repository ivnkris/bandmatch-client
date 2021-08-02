import React from "react";

import Header from ".";

export default {
  title: "Components/Header",
  component: Header,
};

export const PageHeader = (args) => <Header {...args} />;
PageHeader.args = {
  title: "Create, complete or join a band",
};
