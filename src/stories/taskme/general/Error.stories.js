import React from "react";
import ErrorPage from "/src/pages/error";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Error",
  component: ErrorPage,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ErrorPage {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const Custom = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Custom.args = {
  title: "Custom Error",
  mainText: "Custom something went wrong",
  secondaryText:
    "Custom secondary text saying, were working on it and we'll get it fixed as soon as we can.",
};
