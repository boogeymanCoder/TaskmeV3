import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { logOutAccount } from "src/services/user";
import CheckAuth from "src/components/auth/CheckAuth";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  useEffect(() => {
    if ((!user && !userLoading) || userError) router.push("/login");
  }, [user, userLoading, userError]);

  if (userLoading || !user) return null;

  return (
    <>
      <Head>
        <title>404 | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography align="center" color="textPrimary" variant="h1">
              Verify Your Email
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              Before being able to use your account you need to verify that this is your email
              address by clicking the link we sent, click{" "}
              <Link
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
                onClick={(e) => console.log("Clicked!")}
              >
                here
              </Link>{" "}
              to resend.
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <img
                alt="Under development"
                src="/static/images/undraw_mailbox_re_dvds.svg"
                style={{
                  marginTop: 50,
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 560,
                }}
              />
            </Box>
            <NextLink href="/login" passHref>
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
                onClick={(e) => logOutAccount()}
              >
                Go to Log in
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
