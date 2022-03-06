import { AccountProfileDetails as AccountProfileDetailsComponent } from "/src/components/account/account-profile-details";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Account/Account Profile Details",
  component: AccountProfileDetailsComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <AccountProfileDetailsComponent />
    </StorybookCheckAuth>
  );
};

export const AccountProfileDetails = Template.bind({});
AccountProfileDetails.args = {};
