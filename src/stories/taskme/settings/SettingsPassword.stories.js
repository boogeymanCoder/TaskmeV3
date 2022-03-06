import { SettingsPassword } from "/src/components/settings/settings-password";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import SnackbarMessage from "/src/components/SnackbarMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Settings/Password",
  component: SettingsPassword,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <SettingsPassword />
      <SnackbarMessage
        message="Login using email and password to enable."
        alertProps={{ severity: "info" }}
      />
    </StorybookCheckAuth>
  );
};

export const Password = Template.bind({});
Password.args = {};
