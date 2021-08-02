import React from "react";

import SoundCloudWidget from ".";

export default {
  title: "Components/SoundCloudWidget",
  component: SoundCloudWidget,
};

export const SCWidget = (args) => <SoundCloudWidget {...args} />;
SCWidget.args = {
  soundCloudUrl:
    "https://w.soundcloud.com/player/?url=https://soundcloud.com/oliviarodrigo/good-4-u-1",
};
