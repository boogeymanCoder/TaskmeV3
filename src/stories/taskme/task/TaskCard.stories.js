import { TaskCard as TaskCardComponent } from "/src/components/task/task-card";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Task/Task Card",
  component: TaskCardComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <TaskCardComponent {...args} />
    </StorybookCheckAuth>
  );
};

export const TaskCard = Template.bind({});
TaskCard.args = {
  taskData: {
    comments: "[]",
    createdAt: '"2022-02-27T00:45:46.341Z"',
    currency: "P",
    date: '"2022-02-27T00:45:19.129Z"',
    details: "test",
    employer: "HEgcbARb8AUqSj5L8idA3vlIbxD2",
    location: "test",
    open: true,
    price: 0,
    skills: "[]",
    tags: "[]",
    title: "test",
    updatedAt: '"2022-02-27T00:45:46.341Z"',
    ups: '["CZmBrbdOpEcJKxmZ23zEanWuPyZ2"]',
    uid: "-Mwsczxug3YSN2fBlMA6",
  },
};
