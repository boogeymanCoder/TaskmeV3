import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { setAccount } from "../../services/user";

import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import SnackbarMessage from "../SnackbarMessage";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";

import PropTypes from "prop-types";

/**
 * Allows users to view and update their profile information.
 */
export function AccountProfileDetails({ publicView = false, id, ...props }) {
  const database = getDatabase();

  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  const [account, accountLoading, accountError] = useObjectVal(ref(database, `accounts/${id}`));
  const [updateProfile, updateProfileLoading, updateProfileError] = useUpdateProfile(auth);
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);

  console.log({ account, accountLoading, accountError });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      address: "",
      email: "",
      contact: "",
      gender: "Male",
      image: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().max(255).required("Name is required"),
      address: Yup.string().max(255).required("Address is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      contact: Yup.string().max(255).required("Contact is required"),
      gender: Yup.string().oneOf(["Male", "Female"]).required("Gender is required"),
    }),
    onSubmit: async (values) => {
      return setAccount(user.uid, values, user, account !== null)
        .then(async (res) => {
          console.log({ res });
          await updateProfile({ displayName: values.fullname }).then(() =>
            setShowSuccessUpdate(true)
          );
        })
        .catch((err) => {
          console.log({ err });
          setShowError(true);
          setError(err);
        });
    },
  });

  useEffect(() => {
    console.log({ updateProfileError });
  }, [updateProfileError]);

  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!accountLoading && account) {
      return formik.setValues({
        fullname: account.fullname,
        address: account.address,
        email: account.email,
        contact: account.contact,
        gender: account.gender,
        image: account.image,
      });
    }
    if (!accountLoading && !account && !publicView) {
      return formik.setValues({
        fullname: user && user.displayName ? user.displayName : "",
        address: "",
        email: user && user.email ? user.email : "",
        contact: "",
        gender: "Male",
        image: user.photoURL ? user.photoURL : "",
      });
    }
  }, [accountLoading]);

  return (
    <form onSubmit={formik.handleSubmit} noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                disabled={userLoading || accountLoading || formik.isSubmitting || publicView}
                error={Boolean(formik.touched.fullname && formik.errors.fullname)}
                helperText={formik.touched.fullname && formik.errors.fullname}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fullname}
                name="fullname"
                fullWidth
                label="Full Name"
                type="text"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  disabled={userLoading || accountLoading || formik.isSubmitting || publicView}
                  error={Boolean(formik.touched.gender && formik.errors.gender)}
                  fullWidth
                  helperText={formik.touched.gender && formik.errors.gender}
                  label="Gender"
                  name="gender"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.gender}
                  variant="outlined"
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={userLoading || accountLoading || formik.isSubmitting || publicView}
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label="Address"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.address}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled={userLoading || accountLoading || formik.isSubmitting || publicView}
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Contact Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.email}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled={userLoading || accountLoading || formik.isSubmitting || publicView}
                error={Boolean(formik.touched.contact && formik.errors.contact)}
                fullWidth
                helperText={formik.touched.contact && formik.errors.contact}
                label="Contact Number"
                name="contact"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.contact}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        {!publicView && (
          <>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <Button
                color="primary"
                variant="contained"
                disabled={userLoading || accountLoading || formik.isSubmitting || publicView}
                type="submit"
              >
                Save details
              </Button>
            </Box>
          </>
        )}

        <SnackbarMessage
          message="Updated successfully"
          snackbarProps={{ open: showSuccessUpdate }}
          alertProps={{ onClose: () => setShowSuccessUpdate(false) }}
        />
        <SnackbarErrorMessage error={userError} />
        <SnackbarErrorMessage error={accountError} />
        <SnackbarErrorMessage error={updateProfileError} />
      </Card>
    </form>
  );
}

AccountProfileDetails.propTypes = {
  /**
   * Whether the profile is in public view.
   */
  publicView: PropTypes.bool,
  /**
   * The users id
   */
  id: PropTypes.string,
};

AccountProfileDetails.default = {
  publicView: false,
};
