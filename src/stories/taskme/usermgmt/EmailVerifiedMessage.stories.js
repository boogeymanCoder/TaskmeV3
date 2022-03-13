import React from "react";
import { default as EmailVerifiedMessageComponent } from "/src/components/usermgmt/EmailVerifiedMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "User Management/Email Verified Message",
  component: EmailVerifiedMessageComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <EmailVerifiedMessageComponent {...args} />;

export const EmailVerifiedMessage = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EmailVerifiedMessage.args = {};
