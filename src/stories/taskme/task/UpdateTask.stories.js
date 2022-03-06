import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import UpdateTask from "/src/components/task/UpdateTask";
import { useState } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Task/UpdateTask",
  component: UpdateTask,
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
        <UpdateTask {...args} />
      </LocalizationProvider>
    </StorybookCheckAuth>
  );
};

export const Open = Template.bind({});
Open.args = {
  oldImageLinks: [
    "https://firebasestorage.googleapis.com/v0/b/taskme-2d808.appspot.com/o/task%2F-Mwsczxug3YSN2fBlMA6%2F7PJSyvV5YdLRTD384Yuzfw.jpg?alt=media&token=e69a23a7-12f9-49e1-b55a-939923ce8b75",
  ],
  task: {
    comments: [],
    createdAt: "2022-02-27T00:45:46.341Z",
    currency: "P",
    date: "2022-02-27T00:45:19.129Z",
    details: "test",
    employer: "HEgcbARb8AUqSj5L8idA3vlIbxD2",
    location: "test",
    open: true,
    price: 0,
    skills: [],
    tags: [],
    title: "test",
    updatedAt: "2022-02-27T00:45:46.341Z",
    ups: ["CZmBrbdOpEcJKxmZ23zEanWuPyZ2"],
    uid: "-Mwsczxug3YSN2fBlMA6",
  },
  open: true,
  filenames: new Map(),
};

export const Close = Template.bind({});
Close.args = {
  oldImageLinks: [
    "https://firebasestorage.googleapis.com/v0/b/taskme-2d808.appspot.com/o/task%2F-Mwsczxug3YSN2fBlMA6%2F7PJSyvV5YdLRTD384Yuzfw.jpg?alt=media&token=e69a23a7-12f9-49e1-b55a-939923ce8b75",
  ],
  task: {
    comments: [],
    createdAt: "2022-02-27T00:45:46.341Z",
    currency: "P",
    date: "2022-02-27T00:45:19.129Z",
    details: "test",
    employer: "HEgcbARb8AUqSj5L8idA3vlIbxD2",
    location: "test",
    open: true,
    price: 0,
    skills: [],
    tags: [],
    title: "test",
    updatedAt: "2022-02-27T00:45:46.341Z",
    ups: ["CZmBrbdOpEcJKxmZ23zEanWuPyZ2"],
    uid: "-Mwsczxug3YSN2fBlMA6",
  },
  open: false,
  filenames: new Map(),
};
