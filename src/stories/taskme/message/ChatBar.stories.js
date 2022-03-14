import { Typography } from "@mui/material";
import React from "react";
import { default as ChatBarComponent } from "/src/components/message/ChatBar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Message/Chat Bar",
  component: ChatBarComponent,
  argTypes: {
    onVoiceCall: { action: "onVoiceCall" },
    onVideoCall: { action: "onVideoCall" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ChatBarComponent {...args} />;

export const ChatBar = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ChatBar.args = {
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  title: "Jane Whiskers",
  lastActive: new Date("March 14, 2022 14:24:00"),
  isActive: false,
  menuActions: [
    {
      name: "Search",
      method: () => console.log("Settings Clicked"),
    },
  ],
};
