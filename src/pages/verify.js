import Head from "next/head";
import NextLink from "next/link";
import { Alert, Box, Button, Container, Link, Snackbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { logOutAccount } from "/src/services/user";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import RedirectPage from "/src/components/redirect-page";
import SnackbarErrorMessage from "/src/components/SnackbarErrorMessage";
import PropTypes from "prop-types";

const Verify = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

  useEffect(() => {
    if ((!user && !userLoading) || userError) router.push("/login");
  }, [user, userLoading, userError]);

  useEffect(() => {
    console.log(user);
    if (user) {
      if (user.providerData[0].providerId !== "password" || user.emailVerified)
        return router.push("/");
    }
  }, [user]);

  if (userLoading || !user) return null;

  return (
    <>
      <VerifyPage />

      <SnackbarErrorMessage error={userError} />
      <SnackbarErrorMessage error={error} />
    </>
  );
};

/**
 * Displays verification message to email and password users, as they need to verify
 * their email address first before being able to use the website.
 */
export const VerifyPage = ({ sending, sendEmailVerification }) => {
  return (
    <RedirectPage
      title="Verify Email"
      mainText="Verify Your Email"
      secondaryTypography={
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Before being able to use your account you need to verify that this is your email address
          by clicking the link we sent, click{" "}
          <Link
            variant="subtitle2"
            underline={sending ? "none" : "hover"}
            sx={{
              cursor: !sending ? "pointer" : "default",
            }}
            disabled={sending}
            color={sending ? "text" : "primary"}
            onClick={!sending ? async (e) => await sendEmailVerification() : null}
          >
            here
          </Link>{" "}
          to resend.
        </Typography>
      }
      image="/static/images/undraw_mailbox_re_dvds.svg"
      buttonText="Go to Login"
      onContinue={(e) => logOutAccount()}
      continueUrl="/login"
    />
  );
};

VerifyPage.propTypes = {
  /**
   * Whether the verification email is sending.
   */
  sending: PropTypes.bool.isRequired,
  /**
   * Function to call when sending email verification.
   */
  sendEmailVerification: PropTypes.func.isRequired,
};

export default Verify;
