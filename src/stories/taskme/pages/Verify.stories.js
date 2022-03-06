import { VerifyPage } from "/src/pages/verify";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Pages/Verify",
  component: VerifyPage,
  argTypes: {
    sendEmailVerification: { action: "sendEmailVerification" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <VerifyPage {...args} />;
};

export const Sending = Template.bind({});
Sending.args = {
  sending: true,
};

export const NonSending = Template.bind({});
NonSending.args = {
  sending: false,
};
