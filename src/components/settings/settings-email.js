import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useUpdateEmail, useSendEmailVerification, useAuthState } from "react-firebase-hooks/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { logOutAccount } from "/src/services/user";
import SnackbarMessage from "../SnackbarMessage";
import SnackbarErrorMessage from "../SnackbarErrorMessage";

/**
 * Allows the use to edit their email address if they authenticated using email and password.
 */
export function SettingsEmail(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [alertEmailUpdated, setAlertEmailUpdated] = useState(false);
  const auth = getAuth();
  const [user, loading, userError] = useAuthState(auth);
  const [updateEmail, updating, error] = useUpdateEmail(auth);
  const [sendEmailVerification, sendingEmailVerification, sendEmailVerificationError] =
    useSendEmailVerification(auth);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    console.log({ error });
  }, [error]);

  useEffect(() => {
    if (user && user.providerData[0].providerId == "password") {
      setShowUpdate(true);
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    }),
    onSubmit: async (values) => {
      if (values.email === user.email) {
        setShowErrorMessage(true);
        setErrorMessage({ message: "Cant update to current email" });
        return;
      }
      return updateEmail(values.email).then(async () => {
        await sendEmailVerification();
        setAlertEmailUpdated(true);

        logOutAccount();
      });
    },
  });

  if (!showUpdate) return null;

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Card>
        <CardHeader subheader="Update login email" title="Login Email" />
        <Divider />
        <CardContent>
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Login Email"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            variant="outlined"
            required
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            disabled={formik.isSubmitting || sendingEmailVerification}
            type="submit"
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>

      <SnackbarMessage
        message="Email updated successfully, logging out"
        snackbarProps={{
          open: alertEmailUpdated,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        }}
        alertProps={{ onClose: () => setAlertEmailUpdated(!alertEmailUpdated) }}
      />
      <SnackbarErrorMessage error={error} />
      <SnackbarErrorMessage error={userError} />
      <SnackbarErrorMessage
        error={errorMessage}
        snackbarProps={{ open: showErrorMessage }}
        alertProps={{ onClose: () => setShowErrorMessage(!showErrorMessage) }}
      />
    </form>
  );
}
