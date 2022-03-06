import NotFoundPage from "/src/pages/404";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Pages/Not Found",
  component: NotFoundPage,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return <NotFoundPage />;
};

export const NotFound = Template.bind({});
NotFound.args = {};
