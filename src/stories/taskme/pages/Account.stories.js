import { AccountPage } from "/src/pages/account/[id]";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Pages/Account",
  component: AccountPage,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <AccountPage />
    </StorybookCheckAuth>
  );
};

export const Account = Template.bind({});
Account.args = {};
