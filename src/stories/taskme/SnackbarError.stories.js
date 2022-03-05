import React from "react";
import SnackbarErrorMessage from "/src/components/SnackbarErrorMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "TaskME/SnackbarErrorMessage",
  component: SnackbarErrorMessage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SnackbarErrorMessage {...args} />;

export const HasError = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HasError.args = {
  error: {
    message: "Error from imaginary server.",
  },
};

export const NoError = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoError.args = {
  error: null,
};

export const NoAutoHide = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoAutoHide.args = {
  error: {
    message: "Error from imaginary server.",
  },
  snackbarProps: { autoHideDuration: null },
};
