import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import AccountCheck from "/src/components/account/AccountCheck";
import { DashboardLayout } from "/src/components/dashboard-layout";
import { Box } from "@mui/system";
import Head from "next/head";
import PostListToolbar from "/src/components/post/PostToolbar";
import PostForm from "/src/components/post/PostForm";
import { getAuth } from "firebase/auth";
import { LinearProgress } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import { getDatabase, ref } from "firebase/database";
import { setPost } from "../../services/post";
import { PostCard } from "/src/components/post/Post";

export default function Posts() {
  const auth = getAuth();
  const database = getDatabase();
  const [user, userLoading, userError] = useAuthState(auth);
  const [account, accountLoading, accountError] = useObjectVal(
    ref(database, `accounts/${user?.uid}`)
  );

  const [posts, postsLoading, postsError] = useListVals(ref(database, "posts"), {
    keyField: "uid",
  });

  useEffect(() => console.log({ user, userLoading, userError }), [user, userLoading, userError]);
  useEffect(
    () => console.log({ account, accountLoading, accountError }),
    [account, accountLoading, accountError]
  );
  useEffect(
    () => console.log({ posts, postsLoading, postsError }),
    [posts, postsLoading, postsError]
  );

  if (
    !user ||
    userLoading ||
    userError ||
    !account ||
    accountLoading ||
    accountError ||
    !posts ||
    postsLoading ||
    postsError
  ) {
    return <LinearProgress />;
  }

  function handleAddPost(post) {
    return setPost({ ...post, owner: user.uid });
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
                    onSubmit={handleAddPost}
                  />
                </Grid>
                {posts?.map((post) => {
                  return (
                    <Grid item key={post.uid} xs={12}>
                      <PostCard postData={post} />
                    </Grid>
                  );
                })}
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
