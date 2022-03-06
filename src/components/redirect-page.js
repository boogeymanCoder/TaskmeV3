import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
/**
 * Template for redirection pages.
 */
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
            {secondaryTypography}
            {!secondaryTypography && (
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
                {buttonText}
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
}

RedirectPage.propTypes = {
  /**
   * Tab title for the redirect page.
   */
  title: PropTypes.string.isRequired,
  /**
   * The title of the redirect page.
   */
  mainText: PropTypes.string.isRequired,
  /**
   * Additional message  for the redirect page.
   */
  secondaryText: PropTypes.string,
  /**
   * If an element was given, it will be displayed rather than the secondaryText.
   * The element is preferable as an MUI Typography although any other element is allowed.
   */
  secondaryTypography: PropTypes.element,
  /**
   * link to the image to be displayed at the middle of the redirect page.
   */
  image: PropTypes.string.isRequired,
  /**
   * Where to redirect the user after clicking the redirect page's button.
   */
  continueUrl: PropTypes.string.isRequired,
  /**
   * The text to display on the redirect page button.
   */
  buttonText: PropTypes.string.isRequired,
  /**
   * Function to call after the upon redirecting the user.
   */
  onContinue: PropTypes.func,
};
