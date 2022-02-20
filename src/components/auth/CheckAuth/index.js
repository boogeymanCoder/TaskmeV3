import { CircularProgress, LinearProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { logOutAccount } from "src/services/user";

export default function CheckAuth({ children }) {
  const router = useRouter();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (
      user &&
      !userLoading &&
      user.providerData[0].providerId === "password" &&
      !user.emailVerified
    ) {
      setShouldRender(false);
      // logOutAccount().then((res) => {
      router.push("/verify");
      // });
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (!shouldRender) return;
    if ((!user && !userLoading) || userError) router.push("/login");
  }, [user, userLoading, userError]);

  if (userLoading || !user || !shouldRender) return <LinearProgress />;

  console.log({ user, userLoading, userError });

  return <>{children}</>;
}
