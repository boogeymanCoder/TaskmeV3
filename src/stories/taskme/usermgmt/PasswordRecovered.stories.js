import React from "react";
import { default as PasswordRecoveredComponent } from "/src/components/usermgmt/PasswordRecovered";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "User Management/Password Recovered",
  component: PasswordRecoveredComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PasswordRecoveredComponent {...args} />;

export const PasswordRecovered = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PasswordRecovered.args = {};
