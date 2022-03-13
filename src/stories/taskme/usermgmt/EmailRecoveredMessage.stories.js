import React from "react";
import { default as EmailRecoveredMessageComponent } from "/src/components/usermgmt/EmailRecoveredMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "User Management/Email Recovered Message",
  component: EmailRecoveredMessageComponent,
  argTypes: {
    showResetPassword: { action: "showResetPassword" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <EmailRecoveredMessageComponent {...args} />;

export const EmailRecoveredMessage = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EmailRecoveredMessage.args = {};
