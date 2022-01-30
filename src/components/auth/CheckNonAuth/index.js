import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CheckNonAuth({ children }) {
  const router = useRouter();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  useEffect(() => {
    if (user && !userLoading) router.push("/");
  }, [user, userLoading]);

  if (userLoading) return null;

  console.log({ user, userLoading, userError });

  return <>{children}</>;
}
