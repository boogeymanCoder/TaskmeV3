import React from "react";
import { default as ConversationListComponent } from "/src/components/message/ConversationList";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Message/Conversation List",
  component: ConversationListComponent,
  argTypes: {
    onClick: { action: "onClick" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ConversationListComponent {...args} />;

export const ConversationList = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ConversationList.args = {
  conversations: [
    {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "Marry Jane",
      lastSender: "Mary Jane",
      lastMessage: "Hello, I would like to follow up the task.",
      lastMessageSent: "2m ago",
      isRead: false,
      id: "-MyXNGUXRY54xjjKjOCW",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "Allan Parker",
      lastSender: "Allan Parker",
      lastMessage: "Hi we need to test the AI tomorrow.",
      lastMessageSent: "2h ago",
      isRead: true,
      id: "-MyXNR4P6P3BztGBfhNc",
    },
  ],
};
