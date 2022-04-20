import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import AccountCheck from "/src/components/account/AccountCheck";
import { DashboardLayout } from "src/components/dashboard-layout";
import { Box } from "@mui/system";
import Head from "next/head";
import PostListToolbar from "src/components/post/PostToolbar";
import PostForm from "src/components/post/PostForm";
import { getAuth } from "firebase/auth";
import { LinearProgress } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { getDatabase, ref } from "firebase/database";

export default function Posts() {
  const auth = getAuth();
  const database = getDatabase();
  const [user, userLoading, userError] = useAuthState(auth);
  const [account, accountLoading, accountError] = useObjectVal(
    ref(database, `accounts/${user?.uid}`)
  );

  useEffect(() => console.log({ user, userLoading, userError }), [user, userLoading, userError]);
  useEffect(
    () => console.log({ account, accountLoading, accountError }),
    [account, accountLoading, accountError]
  );

  if (!user || userLoading || userError || !account || accountLoading || accountError) {
    return <LinearProgress />;
  }
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
            <PostListToolbar handleAddPost={() => alert("open create post form")} />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                <Grid item key="post" xs={12}>
                  <PostForm
                    avatar={account.image}
                    name={account.fullname}
                    lastUpdate="New Post"
                    sx={{ my: 1 }}
                  />
                </Grid>
              </Grid>
            </Box>
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
