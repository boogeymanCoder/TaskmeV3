import NewTask from "/src/components/task/NewTask";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Task/NewTask",
  component: NewTask,
  argTypes: {
    handleClose: { action: "handleClose" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NewTask {...args} />
      </LocalizationProvider>
    </StorybookCheckAuth>
  );
};

export const Open = Template.bind({});
Open.args = {
  open: true,
};

export const Close = Template.bind({});
Close.args = {
  open: false,
};
