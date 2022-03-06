import { SettingsEmail } from "/src/components/settings/settings-email";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import SnackbarMessage from "/src/components/SnackbarMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Settings/Email",
  component: SettingsEmail,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <SettingsEmail />
      <SnackbarMessage
        message="Login using email and password to enable."
        alertProps={{ severity: "info" }}
      />
    </StorybookCheckAuth>
  );
};

export const Email = Template.bind({});
Email.args = {};
