import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../../components/dashboard-layout";
import CheckAuth from "/src/components/auth/CheckAuth";
import AccountCheck from "/src/components/account/AccountCheck";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getDatabase, ref as dbRef, update } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { App as SendBirdApp, Channel, SendBirdProvider } from "sendbird-uikit";
import { Avatar, CardHeader, LinearProgress } from "@mui/material";

function Messages() {
  const router = useRouter();
  console.log({ router });
  // get currently logged in user
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  useEffect(() => {
    console.log({ user, userLoading, userError });
  }, [user, userLoading, userError]);

  const database = getDatabase();
  const taskRef = dbRef(database, `tasks/${router.query?.uid}`);
  const [task, taskLoading, taskError] = useObjectVal(taskRef);

  if (!user || userLoading || userError || !task || taskLoading || taskError) {
    return <LinearProgress />;
  }

  return (
    <CheckAuth>
      <MessagesPage user={user} task={task} />
    </CheckAuth>
  );
}

/**
 * Here the user can view their messages.
 */
export function MessagesPage({ user, task }) {
  return (
    <CheckAuth>
      <AccountCheck>
        <Head>
          <title>Messages | TaskME</title>
        </Head>

        {/* <SendBirdApp
          appId={process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID} // Specify your Sendbird application ID.
          userId={user.uid} // Specify your user ID.
          config={{ logLevel: "all" }}
          nickname={user.fullname}
          profileUrl={user.photoURL}
          disableAutoSelect={true}
          replyType="QUOTE_REPLY"
        /> */}
        <SendBirdProvider appId={process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID} userId={user.uid}>
          <Channel
            channelUrl={task.channel_url}
            renderChatHeader={({ channel, user }) => {
              return (
                <CardHeader
                  sx={{ p: 1, m: 0 }}
                  avatar={<Avatar src={channel.coverUrl} />}
                  title={channel.name}
                />
              );
            }}
          />
        </SendBirdProvider>
      </AccountCheck>
    </CheckAuth>
  );
}

Messages.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Messages;
