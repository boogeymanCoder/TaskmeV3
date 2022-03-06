import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import { MessagesPage } from "/src/pages/messages";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Pages/Messages",
  component: MessagesPage,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <StorybookCheckAuth>
      <MessagesPage />
    </StorybookCheckAuth>
  );
};

export const Messages = Template.bind({});
Messages.args = {};
