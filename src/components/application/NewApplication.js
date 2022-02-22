import { Send } from "@mui/icons-material";
import { IconButton, InputAdornment, LinearProgress, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { setApplication } from "src/services/application";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarErrorMessage from "../SnackbarErrorMessage";

export default function NewApplication({ taskId }) {
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
      })
        .then((res) => console.log({ res }))
        .catch((err) => console.log({ err }));
    },
  });

  if (!user || userLoading) return <LinearProgress />;

  return (
    <>
      <TextField
        error={Boolean(formik.touched.message && formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.message}
        name="message"
        autoFocus
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
    </>
  );
}
