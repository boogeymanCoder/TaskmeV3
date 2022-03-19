import React from "react";
import { default as ConversationComponent } from "/src/components/message/Conversation";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Message/Conversation",
  component: ConversationComponent,
  argTypes: {
    onClick: { action: "onClick" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ConversationComponent {...args} />;

export const Read = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Read.args = {
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  title: "Marry Jane",
  lastSender: "Mary Jane",
  lastMessage: "Hello, I would like to follow up the task.",
  lastMessageSent: "2m ago",
  isRead: true,
};

export const NotRead = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NotRead.args = {
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  title: "Marry Jane",
  lastSender: "Mary Jane",
  lastMessage: "Hello, I would like to follow up the task.",
  lastMessageSent: "2m ago",
  isRead: false,
  id: "-MyXNGUXRY54xjjKjOCW",
};
