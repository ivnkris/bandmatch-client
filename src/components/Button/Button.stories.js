import React from "react";

import Button from ".";

export default {
  title: "Components/Button",
  component: Button,
};

export const Primary = (args) => <Button {...args} />;
Primary.args = {
  label: "REQUEST",
  onClick: () => {},
  size: "medium",
  mode: "primary",
};

export const Secondary = (args) => <Button {...args} />;
Secondary.args = {
  label: "ASSEMBLE",
  onClick: () => {},
  size: "large",
  mode: "secondary",
};
