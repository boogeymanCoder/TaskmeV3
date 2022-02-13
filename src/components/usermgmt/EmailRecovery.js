import { applyActionCode, checkActionCode, sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Error from "../../pages/error";
import EmailRecoveredMessage from "./EmailRecoveredMessage";

export default function EmailRecovery({ auth, actionCode, lang }) {
  const [page, setPage] = useState(null);
  useEffect(() => {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    let restoredEmail = null;
    // Confirm the action code is valid.
    checkActionCode(auth, actionCode)
      .then((info) => {
        // Get the restored email address.
        restoredEmail = info["data"]["email"];

        // Revert to the old email.
        return applyActionCode(auth, actionCode);
      })
      .then(() => {
        // Account email reverted to restoredEmail

        // TODO: Display a confirmation message to the user.

        // You might also want to give the user the option to reset their password
        // in case the account was compromised:
        if (confirm("Reset password?")) {
          sendPasswordResetEmail(auth, restoredEmail)
            .then(() => {
              // Password reset confirmation sent. Ask user to check their email.
              alert("Password reset email sent");
            })
            .catch((error) => {
              // Error encountered while sending password reset code.
              alert("Password reset email not sent");
            });
        }

        setPage(<EmailRecoveredMessage />);
      })
      .catch((error) => {
        // Invalid code.
        setPage(
          <Error
            title="Recovery failed"
            mainText="Email Recovery failed"
            secondaryText="Recovery link may have been used or expired, if this is not the case please try again."
          />
        );
      });
  }, []);

  return page;
}
