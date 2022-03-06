import { TasksPage } from "/src/pages/tasks";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Pages/Tasks",
  component: TasksPage,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <TasksPage />
    </StorybookCheckAuth>
  );
};

export const Tasks = Template.bind({});
Tasks.args = {};
