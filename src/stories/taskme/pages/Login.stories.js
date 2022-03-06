import { LoginPage } from "/src/pages/login";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Pages/Login",
  component: LoginPage,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <LoginPage />;
};

export const Login = Template.bind({});
Login.args = {};
