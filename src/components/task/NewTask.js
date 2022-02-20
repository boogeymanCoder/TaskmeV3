import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TagInput from "../TagInput";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  Switch,
} from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setTask } from "src/services/task";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SnackbarMessage from "../SnackbarMessage";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import { get, getDatabase, ref } from "firebase/database";

export default function NewTask({ open, handleClose }) {
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [showErrorAdd, setShowErrorAdd] = useState(false);
  const [error, setError] = useState({ message: null });
  const auth = getAuth();
  const database = getDatabase();
  const [user, userLoading, userError] = useAuthState(auth);

  const formik = useFormik({
    initialValues: {
      title: "",
      details: "",
      tags: [],
      currency: "",
      price: 0,
      skills: [],
      date: new Date(),
      location: "",
      open: true,
      ups: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("Title is required"),
      details: Yup.string().max(255).required("Details is required"),
      currency: Yup.string().required("Currency is required"),
      price: Yup.number().required("Price is required"),
      date: Yup.date().required("Date is required"),
      location: Yup.string().max(255).required("Location is required"),
    }),
    onSubmit: async (values) => {
      const employer = ref(database, `accounts/${user.uid}`);
      const promise = setTask({
        ...values,
        date: JSON.stringify(values.date),
        employer: JSON.stringify(employer),
        ups: JSON.stringify(values.ups),
        skills: JSON.stringify(values.skills),
        tags: JSON.stringify(values.tags),
      })
        .then((res) => {
          handleClose();
          formik.resetForm();
          setShowSuccessAdd(true);
          console.log({ res });
        })
        .catch((err) => {
          console.log({ err });
          setError(err);
          setShowErrorAdd(true);
        });

      return promise;
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" scroll="body">
        <form onSubmit={formik.handleSubmit} noValidate>
          <DialogTitle>Add task</DialogTitle>
          <DialogContent>
            <DialogContentText>Fields marked with (*) are required.</DialogContentText>
            <TextField
              error={Boolean(formik.touched.title && formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
              disabled={formik.isSubmitting}
              name="title"
              sx={{ my: 1 }}
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              error={Boolean(formik.touched.details && formik.errors.details)}
              helperText={formik.touched.details && formik.errors.details}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              disabled={formik.isSubmitting}
              name="details"
              sx={{ mb: 1 }}
              label="Details"
              type="text"
              fullWidth
              variant="outlined"
              multiline={true}
              minRows={3}
              required
            />
            <TagInput
              disabled={formik.isSubmitting}
              label="Tags (press space to add tag)"
              sx={{ mb: 1 }}
            />
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item sm={3} xs={12}>
                <TextField
                  error={Boolean(formik.touched.currency && formik.errors.currency)}
                  helperText={formik.touched.currency && formik.errors.currency}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.currency}
                  disabled={formik.isSubmitting}
                  name="currency"
                  label="Currency"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.price && formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  disabled={formik.isSubmitting}
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
            <TagInput
              disabled={formik.isSubmitting}
              sx={{ mb: 1 }}
              label="Skills (press space to add skill)"
            />
            <DateTimePicker
              onChange={(value) => {
                formik.setFieldValue("date", value, true);
              }}
              disabled={formik.isSubmitting}
              value={formik.values.date}
              label="Date"
              renderInput={(params) => (
                <TextField
                  error={Boolean(formik.touched.date && formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date}
                  onBlur={formik.handleBlur}
                  name="date"
                  fullWidth
                  required
                  sx={{ mb: 1 }}
                  {...params}
                />
              )}
              required
            />
            <TextField
              error={Boolean(formik.touched.location && formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.location}
              disabled={formik.isSubmitting}
              name="location"
              sx={{ mb: 1 }}
              label="Location"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <FormControlLabel
              control={<Switch disabled={formik.isSubmitting} defaultChecked />}
              label="Open"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={formik.isSubmitting}
              onClick={() => {
                handleClose();
                formik.resetForm();
              }}
            >
              Cancel
            </Button>
            <Button disabled={formik.isSubmitting || userLoading} type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <SnackbarMessage
        message="Updated successfully"
        snackbarProps={{ open: showSuccessAdd }}
        alertProps={{ onClose: () => setShowSuccessAdd(false) }}
      />
      <SnackbarMessage
        message={error.message}
        snackbarProps={{ open: showErrorAdd }}
        alertProps={{ severity: "error", onClose: () => setShowErrorAdd(false) }}
      />
      <SnackbarErrorMessage error={userError} />
    </div>
  );
}
