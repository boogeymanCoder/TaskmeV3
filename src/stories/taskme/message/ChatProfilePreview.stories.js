import React from "react";
import { default as ChatProfilePreviewComponent } from "/src/components/message/ChatProfilePreview";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Message/Chat Profile Preview",
  component: ChatProfilePreviewComponent,
  argTypes: {
    onMessage: { action: "onMessage" },
    onVoiceCall: { action: "onVoiceCall" },
    onVideoCall: { action: "onVideoCall" },
    onViewProfile: { action: "onViewProfile" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ChatProfilePreviewComponent {...args} />;

export const ChatProfilePreview = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ChatProfilePreview.args = {
  image:
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  name: "Pug Chan",
  address: "1468 Linda Street, Portland, Pennsylvania, USA",
  gender: "Male",
};
