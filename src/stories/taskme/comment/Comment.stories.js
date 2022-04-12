import React from "react";
import { default as CommentComponent } from "/src/components/comment/Comment";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Comment/Comment",
  component: CommentComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CommentComponent {...args} />;

export const Comment = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Comment.args = {
  avatar:
    "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=741&q=80",
  name: "Kailee Frey",
  lastUpdate: "Just now",
  body: "I am good at math and has experience with being a tutor, maybe I can help you with that.",
};
