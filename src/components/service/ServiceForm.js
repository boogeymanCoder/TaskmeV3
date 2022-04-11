import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import TagInput from "../TagInput";
import { useFormik } from "formik";
import * as Yup from "yup";

/**
 * Allows the user to crate a new service.
 */
export default function ServiceForm({
  title,
  open = false,
  onClose,
  onCancel,
  onSubmit,
  initialValues,
}) {
  const formik = useFormik({
    initialValues: initialValues ?? {
      title: "",
      details: "",
      tags: [],
      currency: "",
      price: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("Title is required"),
      details: Yup.string().required("Details is required"),
      tags: Yup.array(),
      currency: Yup.string().required("Currency is required"),
      price: Yup.number().required("Price is required"),
    }),
    onSubmit: async (values) => {
      return onSubmit(values);
    },
  });
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText> */}

          <TextField
            error={Boolean(formik.touched.title && formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
            disabled={formik.isSubmitting}
            name="title"
            margin="dense"
            label="Title"
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
            multiline
            margin="dense"
            name="details"
            label="Details"
            type="text"
            fullWidth
            variant="outlined"
            maxRows={6}
          />

          <TagInput
            error={Boolean(formik.touched.details && formik.errors.details)}
            helperText={formik.touched.details && formik.errors.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            tags={formik.values.tags}
            setTags={(tags) => formik.setFieldValue("tags", tags)}
            disabled={formik.isSubmitting}
            label="Tags (press space to add tag)"
          />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                error={Boolean(formik.touched.currency && formik.errors.currency)}
                helperText={formik.touched.currency && formik.errors.currency}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.currency}
                disabled={formik.isSubmitting}
                margin="dense"
                name="currency"
                label="Currency"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                error={Boolean(formik.touched.price && formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.price}
                disabled={formik.isSubmitting}
                margin="dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

ServiceForm.propTypes = {
  /**
   * The form title.
   */
  title: PropTypes.string.isRequired,
  /**
   * Whether the modal was open or not.
   */
  open: PropTypes.bool,
  /**
   * Function to call when closing the modal.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Function to call on cancel.
   */
  onCancel: PropTypes.func.isRequired,
  /**
   * Function to call on submit.
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Initial service values for edit service.
   */
  initialValue: PropTypes.object,
};

ServiceForm.default = {
  open: false,
};
