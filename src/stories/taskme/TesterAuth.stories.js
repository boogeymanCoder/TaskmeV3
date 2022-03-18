import React, { useState } from "react";
import StorybookCheckAuth from "/src/components/sb/StorybookCheckAuth";
import { logOutAccount } from "/src/services/user";
import RedirectPage from "/src/components/redirect-page";
import SnackbarMessage from "/src/components/SnackbarMessage";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Tester Auth",
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TesterAuth = (args) => {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <StorybookCheckAuth>
      <RedirectPage
        title="Welcome"
        mainText="Welcome!"
        secondaryText="Welcome to the TaskME component library, you may now start testing."
        image="/static/images/undraw_hello_re_3evm.svg"
        buttonText="Logout"
        onContinue={() => {
          logOutAccount();
          setShowLogout(true);
        }}
      />
      <SnackbarMessage
        message="Logged out successfully, please refresh."
        snackbarProps={{ open: showLogout }}
        alertProps={{ onClose: null }}
      />
    </StorybookCheckAuth>
  );
};
