import { useRouter } from "next/router";
import React from "react";
import Error from "../error";
import ResetPassword from "../../components/usermgmt/ResetPassword";
import { getAuth } from "firebase/auth";
import EmailVerification from "/src/components/usermgmt/EmailVerification";
import EmailRecovery from "/src/components/usermgmt/EmailRecovery";

export default function UserMgmt() {
  const auth = getAuth();
  const { query } = useRouter();

  // Get the action to complete.
  const mode = query["mode"];
  // Get the one-time code from the query parameter.
  const actionCode = query["oobCode"];
  // (Optional) Get the continue URL from the query parameter if available.
  const continueUrl = query["continueUrl"];
  // (Optional) Get the language code if available.
  const lang = query["lang"] || "en";

  switch (mode) {
    case "resetPassword":
      // Display reset password handler and UI.
      //   handleResetPassword(auth, actionCode, continueUrl, lang);
      return (
        <ResetPassword auth={auth} actionCode={actionCode} continueUrl={continueUrl} lang={lang} />
      );
    case "recoverEmail":
      // Display email recovery handler and UI.
      //   handleRecoverEmail(auth, actionCode, lang);
      return <EmailRecovery auth={auth} actionCode={actionCode} lang={lang} />;
    case "verifyEmail":
      // Display email verification handler and UI.
      //   handleVerifyEmail(auth, actionCode, continueUrl, lang);
      return (
        <EmailVerification
          auth={auth}
          actionCode={actionCode}
          continueUrl={continueUrl}
          lang={lang}
        />
      );
    default:
      return null;
  }
}
