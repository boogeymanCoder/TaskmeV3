import { AccountProfile as AccountProfileComponent } from "/src/components/account/account-profile";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Account/Account Profile",
  component: AccountProfileComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <AccountProfileComponent />
    </StorybookCheckAuth>
  );
};

export const AccountProfile = Template.bind({});
AccountProfile.args = {};
