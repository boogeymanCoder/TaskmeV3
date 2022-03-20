import React from "react";
import { default as ConversationViewerComponent } from "/src/components/message/ConversationViewer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Message/Conversation Viewer",
  component: ConversationViewerComponent,
  argTypes: {
    onClick: { action: "onClick" },
    onSearch: { action: "onSearch" },
    onNewMessage: { action: "onNewMessage" },
    onClose: { action: "onClose" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ConversationViewerComponent {...args} />;

export const ConversationViewer = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ConversationViewer.args = {
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
    {
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "Telma",
      lastSender: "You",
      lastMessage: "Hi what time will we meet?",
      lastMessageSent: "2d ago",
      isRead: true,
      id: "-MyXNcrtlkI0Ki_J0viR",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      title: "Pug Chan",
      lastSender: "You",
      lastMessage: "Arf.. arf..",
      lastMessageSent: "1w ago",
      isRead: true,
      id: "-MyXNfPOVIy2cpwRsgMj",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      title: "Regina",
      lastSender: "Regina",
      lastMessage: "See you later.",
      lastMessageSent: "8d ago",
      isRead: true,
      id: "-MyXNiNbAEgjz2IMR5lg",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      title: "Casper",
      lastSender: "Casper",
      lastMessage: "I'll rest for now, just ping me then.",
      lastMessageSent: "8d ago",
      isRead: false,
      id: "-MyXNl_vLj5J4UthOU3i",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      title: "Groot",
      lastSender: "Groot",
      lastMessage: "I am Groot.",
      lastMessageSent: "8d ago",
      isRead: false,
      id: "-MyXNopAsNN_C1xC7KKD",
    },
  ],
};
