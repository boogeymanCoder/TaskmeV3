import { Container, Grid } from "@mui/material";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Error from "/src/pages/error";
import { NewPassword } from "./NewPassword";
import * as Yup from "yup";
import router from "next/router";
import PasswordRecovered from "./PasswordRecovered";

export default function ResetPassword({ auth, actionCode, continueUrl, lang }) {
  console.log("rendered");

  // Localize the UI to the selected language as determined by the lang
  // parameter.

  // Verify the password reset code is valid.
  const [page, setPage] = useState(null);
  const [password, setPassword] = useState();

  console.log({ password });

  useEffect(() => {
    console.log("called");
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        const accountEmail = email;

        setPage(
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <NewPassword setPassword={setPassword} email={accountEmail} />
            </Grid>
          </Grid>
        );
      })
      .catch((error) => {
        console.log({ error });
        setPage(
          <Error
            title="Password recovery failed"
            mainText="Password recovery failed"
            secondaryText="Recovery link may have been used or expired, if this is not the case please try again."
          />
        );
      });
  }, []);

  useEffect(() => {
    if (password) {
      confirmPasswordReset(auth, actionCode, password)
        .then((resp) => {
          console.log("Password reset");
          // Password reset has been confirmed and new password updated.
          // TODO: Display a link back to the app, or sign-in the user directly
          // if the page belongs to the same domain as the app:
          // auth.signInWithEmailAndPassword(accountEmail, newPassword);
          // TODO: If a continue URL is available, display a button which on
          // click redirects the user back to the app via continueUrl with
          // additional state determined from that URL's parameters.
          setPage(
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={3}>
                <PasswordRecovered />
              </Grid>
            </Grid>
          );
        })
        .catch((error) => {
          console.log({ error });
          return <Error />;
        });
    }
  }, [password]);

  return page;
}
