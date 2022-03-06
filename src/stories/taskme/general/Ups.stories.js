import { Alert, LinearProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SnackbarErrorMessage from "/src/components/SnackbarErrorMessage";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import { default as UpsComponent } from "/src/components/Ups";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Ups",
  component: UpsComponent,
  argTypes: {
    addUp: { action: "addUp" },
    unUp: { action: "unUp" },
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
      <UpsComponent {...args} />
      {user && (
        <Alert severity="info" sx={{ margin: 1 }}>
          Your uid: {user.uid}
        </Alert>
      )}
      <SnackbarErrorMessage error={userError} />
    </StorybookCheckAuth>
  );
};

export const Ups = Template.bind({});
Ups.args = {
  ups: ["CZmBrbdOpEcJKxmZ23zEanWuPyZ2"],
};
