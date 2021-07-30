import React from "react";

import MobileNavBar from ".";

export default {
  title: "Components/NavigationBars/MobileNavBar",
  component: MobileNavBar,
};

export const MobileNav = (args) => <MobileNavBar {...args} />;

MobileNav.args = {
  label: "Secondary Button",
};
