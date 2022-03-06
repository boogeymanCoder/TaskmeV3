import React from "react";
import { default as ConfirmMessageComponent } from "/src/components/ConfirmMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Confirm Message",
  component: ConfirmMessageComponent,
  argTypes: {
    onAgree: { action: "onAgree" },
    onDisagree: { action: "onDisagree" },
    handleClose: { action: "handleClose" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ConfirmMessageComponent {...args} />;

export const Open = Template.bind({});
Open.args = {
  title: "Sample title",
  message: "Can you please enter something?",
  open: true,
};

export const Close = Template.bind({});
Close.args = {
  title: "Sample title",
  message: "Can you please enter something?",
  open: false,
};
