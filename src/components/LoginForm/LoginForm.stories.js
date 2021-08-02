import React from "react";

import LoginForm from ".";

export default {
  title: "Components/LoginForm",
  component: LoginForm,
};

export const Primary = (args) => <LoginForm {...args} />;
