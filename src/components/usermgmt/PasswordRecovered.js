import React from "react";
import RedirectPage from "../redirect-page";

export default function PasswordRecovered() {
  return (
    <RedirectPage
      title="Password Recovered"
      mainText="Password Recovered"
      secondaryText="A Strong Password is defined as a password that is reasonably difficult to guess in a short period of time either through human guessing or the use of specialized software."
      image="/static/images/undraw_security_re_a2rk.svg"
      buttonText="Go to login"
      continueUrl="/login"
    />
  );
}
