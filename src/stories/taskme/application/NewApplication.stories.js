import React from "react";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert, LinearProgress, Typography } from "@mui/material";
import SnackbarErrorMessage from "/src/components/SnackbarErrorMessage";
import { default as NewApplicationComponent } from "/src/components/application/NewApplication";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "application/New Application",
  component: NewApplicationComponent,
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
      <NewApplicationComponent {...args} />
      {user && (
        <Alert severity="info" sx={{ margin: 1 }}>
          Your uid: {user.uid}
        </Alert>
      )}
      <SnackbarErrorMessage error={userError} />
    </StorybookCheckAuth>
  );
};

export const NewApplication = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NewApplication.args = {
  taskId: "-Mwsczxug3YSN2fBlMA6",
  employer: "HEgcbARb8AUqSj5L8idA3vlIbxD2",
};
