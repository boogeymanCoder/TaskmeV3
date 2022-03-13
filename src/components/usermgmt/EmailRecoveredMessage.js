import { Link, Typography } from "@mui/material";
import React from "react";
import RedirectPage from "../redirect-page";
import PropTypes from "prop-types";

/**
 * Displayed after a user recovers email.
 */
export default function EmailRecoveredMessage({ showResetPassword }) {
  return (
    <RedirectPage
      title="Email Recovered"
      mainText="Your email has been recovered"
      secondaryTypography={
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You can now sign in with this email, click{" "}
          <Link
            variant="subtitle2"
            underline="hover"
            sx={{
              cursor: "pointer",
            }}
            color="primary"
            onClick={async (e) => await showResetPassword()}
          >
            here
          </Link>{" "}
          to reset password.
        </Typography>
      }
      image="/static/images/undraw_new_message_re_fp03.svg"
      buttonText="Go to Login"
      continueUrl="/login"
    />
  );
}

EmailRecoveredMessage.PropTypes = {
  /**
   * Function to call to allow user to reset password.
   */
  showResetPassword: PropTypes.func.isRequired,
};
