import React from "react";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import SnackbarErrorMessage from "/src/components/SnackbarErrorMessage";
import { default as ApplicationListComponent } from "/src/components/application/ApplicationList";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "application/Application List",
  component: ApplicationListComponent,
  argTypes: {
    setApplicationCount: { action: "setApplicationCount" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <ApplicationListComponent {...args} />
    </StorybookCheckAuth>
  );
};

export const ApplicationList = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ApplicationList.args = {
  taskId: "-Mwsczxug3YSN2fBlMA6",
  isEmployer: true,
};
