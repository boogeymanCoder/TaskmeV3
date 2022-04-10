import React, { useEffect, useState } from "react";
import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";
import CheckAuth from "/src/components/auth/CheckAuth";
import AccountCheck from "/src/components/account/AccountCheck";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";

function Messages() {
  // get currently logged in user
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  useEffect(() => {
    console.log({ user, userLoading, userError });
  }, [user, userLoading, userError]);

  // get inbox
  const database = getDatabase();
  const [inbox, inboxLoading, inboxError] = useObjectVal(ref(database, `inbox/${user?.uid}`));
  useEffect(() => {
    console.log({ inbox, inboxLoading, inboxError });
  }, [inbox, inboxLoading, inboxError]);

  return (
    <CheckAuth>
      <MessagesPage />
    </CheckAuth>
  );
}

/**
 * Here the user can view their messages.
 */
export function MessagesPage() {
  return (
    <CheckAuth>
      <AccountCheck>
        <Head>
          <title>Messages | TaskME</title>
        </Head>
        <h1>Messages</h1>
      </AccountCheck>
    </CheckAuth>
  );
}

Messages.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Messages;
