import { Container, Pagination } from "@mui/material";
import React from "react";
import AccountCheck from "/src/components/account/AccountCheck";
import { DashboardLayout } from "src/components/dashboard-layout";
import { Box } from "@mui/system";
import Head from "next/head";

export default function Posts() {
  return (
    <>
      <AccountCheck>
        <Head>
          <title>Services | TaskME</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <div>Posts</div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            >
              <Pagination color="primary" count={3} size="small" />
            </Box>
          </Container>
        </Box>
      </AccountCheck>
    </>
  );
}

Posts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
