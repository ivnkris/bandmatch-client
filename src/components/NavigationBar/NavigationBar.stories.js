import React from "react";

import NavigationBar from ".";

export default {
  title: "Components/NavigationBar",
  component: NavigationBar,
};

export const WebNav = (args) => <NavigationBar {...args} />;

WebNav.args = {
  label: "Secondary Button",
};
