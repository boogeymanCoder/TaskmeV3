import { Send } from "@mui/icons-material";
import { Container, IconButton, InputAdornment, LinearProgress, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { setApplication } from "/src/services/application";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import PropTypes from "prop-types";

/**
 * Allows users to create applications.
 */
export default function NewApplication({ taskId, employer }) {
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      console.log("submitted!");
      return setApplication({
        task: taskId,
        employee: user.uid,
        message: values.message,
        date: JSON.stringify(new Date()),
        accepted: false,
        employer,
      })
        .then((res) => {
          console.log({ res });
          formik.resetForm();
        })
        .catch((err) => console.log({ err }));
    },
  });

  if (!user || userLoading) return <LinearProgress />;

  return (
    <>
      {employer !== user.uid && (
        <Container>
          <TextField
            error={Boolean(formik.touched.message && formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.message}
            disabled={formik.isSubmitting}
            name="message"
            multiline
            fullWidth
            variant="standard"
            label="Application message"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={formik.submitForm} disabled={formik.isSubmitting}>
                    <Send fontSize="large" color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <SnackbarErrorMessage error={userError} />
        </Container>
      )}
    </>
  );
}

NewApplication.propTypes = {
  /**
   * The id of task received from the database.
   */
  taskId: PropTypes.string.isRequired,
  /**
   * The uid of the employer, if this is the users uid it will not allow the user to create applications.
   */
  employer: PropTypes.string.isRequired,
};
