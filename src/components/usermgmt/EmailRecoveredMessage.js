import React from "react";
import RedirectPage from "../redirect-page";

export default function EmailRecoveredMessage() {
  return (
    <RedirectPage
      title="Email Recovered"
      mainText="Your email has been recovered"
      secondaryText="You can now sign in with this email"
      image="/static/images/undraw_new_message_re_fp03.svg"
      buttonMessage="Login"
      continueUrl="/login"
    />
  );
}
