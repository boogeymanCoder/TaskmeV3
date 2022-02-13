import { applyActionCode, checkActionCode, sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Error from "../../pages/error";
import EmailRecoveredMessage from "./EmailRecoveredMessage";
import AlertMessage from "../AlertMessage";
import ConfirmMessage from "../ConfirmMessage";

export default function EmailRecovery({ auth, actionCode, lang }) {
  const [restoredEmail, setRestoredEmail] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [alertPasswordReset, setAlertPasswordReset] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [page, setPage] = useState(null);
  useEffect(() => {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Confirm the action code is valid.
    checkActionCode(auth, actionCode)
      .then((info) => {
        // Get the restored email address.
        setRestoredEmail(info["data"]["email"]);

        // Revert to the old email.
        return applyActionCode(auth, actionCode);
      })
      .then(() => {
        // Account email reverted to restoredEmail

        // TODO: Display a confirmation message to the user.

        // You might also want to give the user the option to reset their password
        // in case the account was compromised:

        setOpenConfirmation(true);

        setPage(<EmailRecoveredMessage showResetPassword={() => setOpenConfirmation(true)} />);
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

  function resetPassword() {
    sendPasswordResetEmail(auth, restoredEmail)
      .then(() => {
        // Password reset confirmation sent. Ask user to check their email.
        setPasswordResetSent(true);
        setAlertPasswordReset(true);
      })
      .catch((error) => {
        // Error encountered while sending password reset code.
        setPasswordResetSent(false);
        setAlertPasswordReset(true);
      });
  }

  return (
    <>
      {page}

      <AlertMessage
        severity={passwordResetSent ? "success" : "error"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={
          passwordResetSent
            ? "Password reset email has been sent"
            : "Password reset email not sent, please try again"
        }
        open={alertPasswordReset}
        setOpen={setAlertPasswordReset}
      />
      <ConfirmMessage
        title="Reset account password?"
        message="Your account might be compromised, it suggested to change password."
        onAgree={(e) => {
          setOpenConfirmation(false);
          resetPassword();
        }}
        onDisagree={(e) => {
          setOpenConfirmation(false);
        }}
        open={openConfirmation}
        handleClose={(e) => setOpenConfirmation(false)}
      />
    </>
  );
}
