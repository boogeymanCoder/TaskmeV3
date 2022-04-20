import React from "react";
import { default as PostToolbarComponent } from "/src/components/post/PostToolbar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Post/Post Toolbar",
  component: PostToolbarComponent,
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PostToolbarComponent {...args} />;

export const Disabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {};

export const Enabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Enabled.args = {
  sortEnabled: true,
  searchEnabled: true,
};

export const SearchOnly = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SearchOnly.args = {
  sortEnabled: false,
  searchEnabled: true,
};

export const SortOnly = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SortOnly.args = {
  sortEnabled: true,
  searchEnabled: false,
};
