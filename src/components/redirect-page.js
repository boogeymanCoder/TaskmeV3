import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function RedirectPage({
  title,
  mainText,
  secondaryText,
  secondaryTypography,
  image,
  continueUrl,
  buttonText,
  onContinue,
}) {
  return (
    <>
      <Head>
        <title>{title} | TaskME</title>
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
              {mainText}
            </Typography>
            {secondaryTypography && { secondaryTypography }}
            {secondaryText && (
              <Typography align="center" color="textPrimary" variant="subtitle2">
                {secondaryText}
              </Typography>
            )}
            <Box sx={{ textAlign: "center" }}>
              <img
                alt="Under development"
                src={image}
                style={{
                  marginTop: 50,
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 560,
                }}
              />
            </Box>
            <NextLink href={continueUrl} passHref>
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
                onClick={onContinue}
              >
                {buttonText || "Go back to dashboard"}
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
}
