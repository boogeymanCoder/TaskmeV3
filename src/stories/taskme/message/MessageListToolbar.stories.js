import React from "react";
import { MessageListToolbar } from "/src/components/message/message-list-toolbar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "TaskME/message/MessageListToolbar",
  component: MessageListToolbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    handleAddMessage: { action: "handleAddMessage" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <MessageListToolbar {...args} />;

export const Disabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
  searchEnabled: false,
  sortEnabled: false,
};

export const Enabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Enabled.args = {
  searchEnabled: true,
  sortEnabled: true,
};

export const searchOnly = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
searchOnly.args = {
  searchEnabled: true,
  sortEnabled: false,
};

export const sortOnly = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
sortOnly.args = {
  searchEnabled: false,
  sortEnabled: true,
};
