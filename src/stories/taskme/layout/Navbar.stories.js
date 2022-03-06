import { DashboardNavbar } from "/src/components/dashboard-navbar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Layout/Navbar",
  component: DashboardNavbar,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <DashboardNavbar />;
};

export const Navbar = Template.bind({});
Navbar.args = {};
