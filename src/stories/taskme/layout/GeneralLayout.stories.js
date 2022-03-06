import { Box, Container } from "@mui/material";
import { DashboardLayout } from "/src/components/dashboard-layout";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Layout/General Layout",
  component: DashboardLayout,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <DashboardLayout>
      <Box sx={{ height: "100%", width: "100%" }} />
    </DashboardLayout>
  );
};

export const GeneralLayout = Template.bind({});
GeneralLayout.args = {};
