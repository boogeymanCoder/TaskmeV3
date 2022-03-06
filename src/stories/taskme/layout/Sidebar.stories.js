import { DashboardSidebar } from "/src/components/dashboard-sidebar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Layout/Sidebar",
  component: DashboardSidebar,
  argTypes: {
    onClose: { action: "onClose" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <DashboardSidebar {...args} />;
};

export const Open = Template.bind({});
Open.args = {
  open: true,
};

export const Close = Template.bind({});
Close.args = {
  open: false,
};
