import React from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import CheckAuth from "/src/components/auth/CheckAuth";
import AccountCheck from "/src/components/account/AccountCheck";
import { MessageListToolbar } from "../components/message/message-list-toolbar";

function Messages() {
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <MessageListToolbar handleAddMessage={() => alert("Add message has been clicked!")} />
        </Box>
      </AccountCheck>
    </CheckAuth>
  );
}

MessagesPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Messages;
