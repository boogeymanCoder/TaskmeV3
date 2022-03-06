import React from "react";
import { default as PromptMessageComponent } from "/src/components/PromptMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Prompt Message",
  component: PromptMessageComponent,
  argTypes: {
    handleClose: { action: "handleClose" },
    setValue: { action: "setValue" },
    handleSubmit: { action: "handleSubmit" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PromptMessageComponent {...args} />;

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

export const Custom = Template.bind({});
Custom.args = {
  title: "Sample title",
  message: "Can you please enter something?",
  open: true,
  label: "Password",
  type: "password",
  value: "",
};
