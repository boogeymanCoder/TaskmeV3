import React from "react";
import { default as MessageComponent } from "/src/components/message/Message";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Message/Message",
  component: MessageComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <MessageComponent {...args} />;

export const Owned = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Owned.args = {
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  message: "Hello, I would like to follow up the task.",
  isOwned: true,
  id: "-MyXQeYqUPJsKpeTlZs0",
};

export const NotOwned = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NotOwned.args = {
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  message: "Hello, I would like to follow up the task.",
  isOwned: false,
  id: "-MyXQeYqUPJsKpeTlZs0",
};
