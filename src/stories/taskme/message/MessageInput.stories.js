import React from "react";
import { default as MessageInputComponent } from "/src/components/message/MessageInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Message/Message Input",
  component: MessageInputComponent,
  argTypes: {
    onSend: { action: "onSend" },
    onUploadFile: { action: "onUploadFile" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <MessageInputComponent {...args} />;

export const MessageInput = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MessageInput.args = {};
