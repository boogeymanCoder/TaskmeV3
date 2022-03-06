import { RegisterPage } from "/src/pages/register";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Pages/Register",
  component: RegisterPage,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <RegisterPage />;
};

export const Register = Template.bind({});
Register.args = {};
