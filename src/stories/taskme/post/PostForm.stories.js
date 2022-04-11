import React from "react";
import { default as PostFormComponent } from "/src/components/post/PostForm";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Forum/Post Form",
  component: PostFormComponent,
  argTypes: {
    onSubmit: { action: "onSubmit" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PostFormComponent {...args} />;

export const NewPost = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NewPost.args = {
  avatar:
    "https://images.unsplash.com/photo-1644982647844-5ee1bdc5b114?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  name: "Melissa Skye",
  lastUpdate: "a day ago",
};

export const EditPost = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditPost.args = {
  avatar:
    "https://images.unsplash.com/photo-1644982647844-5ee1bdc5b114?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  name: "Melissa Skye",
  lastUpdate: "a day ago",
  detailsInitialValue:
    "Hello, I am a student from San Francisco. I am currently having a hard time with math and I was wondering can anyone here help me with, algebra?",
};
