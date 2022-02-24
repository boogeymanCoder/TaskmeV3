import { LinearProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import RedirectPage from "../redirect-page";
import SnackbarErrorMessage from "../SnackbarErrorMessage";

export default function AccountCheck({ children }) {
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [accountRequired, setAccountRequired] = useState(false);

  const database = getDatabase();
  const [account, accountLoading, accountError] = useObjectVal(
    ref(database, `accounts/${user ? user.uid : "dummy"}`)
  );

  useEffect(() => {
    if (!account && !accountLoading) {
      setAccountRequired(true);
    }
  }, [account, accountLoading]);

  if (userLoading || accountLoading) return <LinearProgress />;

  return (
    <>
      {accountRequired && (
        <RedirectPage
          title="Profile Required"
          mainText="Profile Required"
          secondaryText="Please fill in your profile information in order to gain access for some features of TaskME."
          image="/static/images/undraw_profile_re_4a55.svg"
          buttonText="Go to Account"
          continueUrl="/account"
        />
      )}
      {!accountRequired && children}
      <SnackbarErrorMessage error={userError} />
      <SnackbarErrorMessage error={accountError} />
    </>
  );
}
