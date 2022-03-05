import { Alert, Chip, Typography } from "@mui/material";
import React from "react";
import RedirectPage from "/src/components/redirect-page";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "TaskME/RedirectPage",
  component: RedirectPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onContinue: { action: "onContinue" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <RedirectPage {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  title: "Sample",
  mainText: "Sample Redirect Page Title",
  secondaryText:
    "Sample redirect page paragraph with very long sentence and so many words for demonstration",
  image: "https://pbs.twimg.com/media/EXzqzKdWoAADjTL.png",
  continueUrl: "/",
  buttonText: "Continue",
};

export const CustomSecondary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CustomSecondary.args = {
  title: "Sample",
  mainText: "Sample Redirect Page Title",
  secondaryTypography: (
    <Alert severity="info">
      This is a custom secondary text using the Typography component of the MUI library.
    </Alert>
  ),
  image: "https://pbs.twimg.com/media/EXzqzKdWoAADjTL.png",
  continueUrl: "/",
  buttonText: "Continue",
};
