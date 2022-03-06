import React from "react";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import { default as ApplicationComponent } from "/src/components/application/Application";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert, LinearProgress, Typography } from "@mui/material";
import SnackbarErrorMessage from "/src/components/SnackbarErrorMessage";
import { Loop } from "@mui/icons-material";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "application/Application",
  component: ApplicationComponent,
  argTypes: {
    handleAccept: { action: "handleAccept" },
    handleReject: { action: "handleReject" },
    handleEdit: { action: "handleEdit" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  console.log({ user, userLoading, userError });
  if (userLoading) return <LinearProgress />;
  return (
    <StorybookCheckAuth>
      <ApplicationComponent {...args} />
      {user && (
        <Alert severity="info" sx={{ margin: 1 }}>
          Your uid: {user.uid}
        </Alert>
      )}
      <SnackbarErrorMessage error={userError} />
    </StorybookCheckAuth>
  );
};

export const Application = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Application.args = {
  applicationData: {
    accepted: false,
    createdAt: '"2022-02-27T12:14:00.177Z"',
    date: '"2022-02-27T12:14:00.177Z"',
    employee: "2z6DaFNT77hA1oMtqwBK5T4H3bI3",
    employer: "HEgcbARb8AUqSj5L8idA3vlIbxD2",
    message: "asd",
    task: "-Mwsczxug3YSN2fBlMA6",
    updatedAt: '"2022-02-27T12:14:00.177Z"',
    uid: "-Mwv5WOsfpEmbEJ3nByP",
  },
  isEmployer: true,
};
