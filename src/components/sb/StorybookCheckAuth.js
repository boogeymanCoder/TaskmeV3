import { CircularProgress, LinearProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import StorybookVerify from "./StorybookVerify";
import StorybookLogin from "./StorybookLogin";

export default function StorybookCheckAuth({ children }) {
  const [component, setComponent] = useState(children);
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  useEffect(() => {
    if (
      user &&
      !userLoading &&
      user.providerData[0].providerId === "password" &&
      !user.emailVerified
    ) {
      // logOutAccount().then((res) => {
      setComponent(<StorybookVerify />);
      // });
    }
  }, [user, userLoading]);

  useEffect(() => {
    if ((!user && !userLoading) || userError) {
      console.log("login");
      setComponent(<StorybookLogin>{children}</StorybookLogin>);
    }
  }, [user, userLoading, userError]);

  console.log({ user, userLoading, userError });
  console.log({ component });

  if (userLoading) return <LinearProgress />;

  console.log({ user, userLoading, userError });

  return <>{component}</>;
}
