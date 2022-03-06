import { Alert, Chip, Typography } from "@mui/material";
import React from "react";
import SnackbarMessage from "/src/components/SnackbarMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "SnackbarMessage",
  component: SnackbarMessage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SnackbarMessage {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  message: "This is a sample SnackbarMessage.",
};

export const Inform = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Inform.args = {
  message: "This is a sample SnackbarMessage.",
  alertProps: { severity: "info" },
};

export const Warning = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Warning.args = {
  message: "This is a sample SnackbarMessage.",
  alertProps: { severity: "warning" },
};

export const Error = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Error.args = {
  message: "This is a sample SnackbarMessage.",
  alertProps: { severity: "error" },
};

export const NoAutoHide = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoAutoHide.args = {
  message: "This is a sample SnackbarMessage.",
  snackbarProps: { autoHideDuration: null },
};
