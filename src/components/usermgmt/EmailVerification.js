import { applyActionCode } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Error from "src/pages/error";
import EmailVerifiedMessage from "./EmailVerifiedMessage";

export default function EmailVerification({ auth, actionCode, continueUrl, lang }) {
  const [page, setPage] = useState(null);
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  // Try to apply the email verification code.
  useEffect(() => {
    applyActionCode(auth, actionCode)
      .then((resp) => {
        // Email address has been verified.
        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
        setPage(<EmailVerifiedMessage />);
      })
      .catch((error) => {
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
        setPage(
          <Error
            title="Verification failed"
            mainText="Email verification failed"
            secondaryText="Verification link may have been used or expired, if this is not the case please try again."
          />
        );
      });
  }, []);

  return page;
}
