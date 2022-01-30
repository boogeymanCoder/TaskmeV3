import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFound = () => (
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
            Before being able to use your account you need to verify that this is your email address
            by clicking the link we sent.
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
            >
              Go to Log in
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
