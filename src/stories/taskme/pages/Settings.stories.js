import { SettingsPage } from "/src/pages/settings";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import SnackbarMessage from "/src/components/SnackbarMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Pages/Settings",
  component: SettingsPage,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <SettingsPage />
      <SnackbarMessage
        message="Login using email and password to enable options to change email and password."
        alertProps={{ severity: "info" }}
      />
    </StorybookCheckAuth>
  );
};

export const Settings = Template.bind({});
Settings.args = {};
