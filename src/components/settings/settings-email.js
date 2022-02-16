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
import { useUpdateEmail, useSendEmailVerification } from "react-firebase-hooks/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { logOutAccount } from "src/services/user";
import SnackbarMessage from "../SnackbarMessage";

export function SettingsEmail(props) {
  const [alertEmailUpdated, setAlertEmailUpdated] = useState(false);
  const auth = getAuth();
  const [updateEmail, updating, error] = useUpdateEmail(auth);
  const [sendEmailVerification, sendingEmailVerification, sendEmailVerificationError] =
    useSendEmailVerification(auth);

  useEffect(() => {
    console.log({ error });
  }, [error]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    }),
    onSubmit: async (values) => {
      return updateEmail(values.email).then(async () => {
        await sendEmailVerification();
        setAlertEmailUpdated(true);

        logOutAccount();
      });
    },
  });

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
    </form>
  );
}
