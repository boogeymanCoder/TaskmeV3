import React from "react";
import { default as MessageListComponent } from "/src/components/message/MessageList";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Message/Message List",
  component: MessageListComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <MessageListComponent {...args} />;

export const MessageList = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MessageList.args = {
  messages: [
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      message: "Hello, I would like to follow up the task.",
      isOwned: false,
      id: "-MyXQeYqUPJsKpeTlZs0",
      sentAt: "8:15 AM",
    },
    {
      image:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      message: "Hi I am nearly done, just some finishing touches are being added.",
      isOwned: true,
      id: "-MyXQnVcgDIkyAAEKh_u",
      sentAt: "8:16 AM",
      isDelivered: true,
    },
    {
      image:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      message: "I'll ping you once it's done, might take an hour or so.",
      isOwned: true,
      id: "-MyXQzZMDrU4ow3_X1_D",
      sentAt: "8:16 AM",
      isDelivered: true,
    },
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      message: "Okay great.",
      isOwned: false,
      id: "-MyXR1N2FBYvQ61OJBsj",
      sentAt: "8:17 AM",
    },
  ],
};
