import React from "react";
import { NewPassword as NewPasswordComponent } from "/src/components/usermgmt/NewPassword";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "User Management/New Password",
  component: NewPasswordComponent,
  argTypes: {
    setPassword: { action: "setPassword" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <NewPasswordComponent {...args} />;

export const NewPassword = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NewPassword.args = {
  email: "johndoe@email.com",
};
