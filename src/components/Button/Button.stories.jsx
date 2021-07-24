import React from "react";

import Button from ".";

export default {
  title: "Components/Button",
  component: Button,
};

export const Secondary = (args) => <Button {...args} />;

Secondary.args = {
  label: "Secondary Button",
};