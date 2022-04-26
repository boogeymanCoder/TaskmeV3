import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../../components/dashboard-layout";
import CheckAuth from "/src/components/auth/CheckAuth";
import AccountCheck from "/src/components/account/AccountCheck";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { App as SendBirdApp, Channel, SendBirdProvider } from "sendbird-uikit";
import { Avatar, CardHeader, LinearProgress } from "@mui/material";

function Messages() {
  const router = useRouter();
  // get currently logged in user
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  useEffect(() => {
    console.log({ user, userLoading, userError });
  }, [user, userLoading, userError]);

  if (!user || userLoading || userError) return <LinearProgress />;

  return (
    <CheckAuth>
      <MessagesPage user={user} />
    </CheckAuth>
  );
}

/**
 * Here the user can view their messages.
 */
export function MessagesPage({ user }) {
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
            channelUrl="sendbird_group_channel_360893774_bda67db4538814ac19ef98082371e2feaffc5c86"
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
