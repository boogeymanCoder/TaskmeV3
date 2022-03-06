import { Alert, Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import TagInput from "/src/components/TagInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "TagInput",
  component: TagInput,
  argTypes: {
    setTags: { action: "setTags" },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const [tags, setTags] = useState(args.tags);
  return <TagInput {...args} tags={tags} setTags={setTags} />;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  tags: ["tag1", "tag2", "tag3"],
  label: "Tags",
};

export const Success = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Success.args = {
  tags: ["tag1", "tag2", "tag3"],
  label: "Tags",
  chipProps: {
    color: "success",
  },
};

export const Info = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Info.args = {
  tags: ["tag1", "tag2", "tag3"],
  label: "Tags",
  chipProps: {
    color: "info",
  },
};

export const Warning = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Warning.args = {
  tags: ["tag1", "tag2", "tag3"],
  label: "Tags",
  chipProps: {
    color: "warning",
  },
};

export const Error = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Error.args = {
  tags: ["tag1", "tag2", "tag3"],
  label: "Tags",
  chipProps: {
    color: "error",
  },
};
