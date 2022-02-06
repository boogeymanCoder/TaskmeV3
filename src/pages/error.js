import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Error({ title, message }) {
  return (
    <>
      <Head>
        <title>Error | TaskME</title>
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
              Error: {title || "Something went wrong"}
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              {message || "Were working on it and we&#39;ll get it fixed as soon as we can."}
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <img
                alt="Under development"
                src="/static/images/undraw_injured_9757.svg"
                style={{
                  marginTop: 50,
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 560,
                }}
              />
            </Box>
            <NextLink href="/" passHref>
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
              >
                Go back to dashboard
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
}
