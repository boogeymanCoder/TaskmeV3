import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function OfferForm({
  open = false,
  onClose,
  onCancel,
  onSubmit,
  title,
  initialValues,
}) {
  const formik = useFormik({
    initialValues: initialValues ?? {
      task: "",
      details: "",
    },
    validationSchema: Yup.object({
      task: Yup.string().max(255).required("Task is required"),
      details: Yup.string().required("Details is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      return onSubmit(values).then((res) => {
        resetForm();
        return res;
      });
    },
  });
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            error={Boolean(formik.touched.task && formik.errors.task)}
            helperText={formik.touched.task && formik.errors.task}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.task}
            disabled={formik.isSubmitting}
            margin="dense"
            name="task"
            label="Task UID"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.details && formik.errors.details)}
            helperText={formik.touched.details && formik.errors.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            disabled={formik.isSubmitting}
            margin="dense"
            name="details"
            label="Details"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onCancel();
              formik.resetForm();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

OfferForm.propTypes = {
  /**
   * Whether the form is open or not.
   */
  open: PropTypes.bool,
  /**
   * Function to call when the form is closed.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Function to call when the form is cancel.
   */
  onCancel: PropTypes.func.isRequired,
  /**
   * Function to call when the form is submit.
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * The forms title.
   */
  title: PropTypes.string.isRequired,
  /**
   * The initial values for editing an offer.
   */
  initialValues: PropTypes.object,
};
