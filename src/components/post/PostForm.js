import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

/**
 * Displays forum post.
 */
export default function PostForm({
  avatar,
  name,
  lastUpdate,
  detailsInitialValue,
  onSubmit,
  ...props
}) {
  const formik = useFormik({
    initialValues: {
      details: detailsInitialValue ?? "",
    },
    validationSchema: Yup.object({
      details: Yup.string().required("Details is required"),
    }),
    onSubmit: async (values) => {
      return onSubmit(values);
    },
  });
  return (
    <Card {...props}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <CardHeader avatar={<Avatar src={avatar} />} title={name} subheader={lastUpdate} />
        <CardContent>
          <TextField
            error={Boolean(formik.touched.details && formik.errors.details)}
            helperText={formik.touched.details && formik.errors.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            disabled={formik.isSubmitting}
            rows={5}
            label="Details"
            fullWidth
            name="details"
            multiline
          />
        </CardContent>
        <CardActions>
          <Button sx={{ marginLeft: "auto" }} variant="contained" type="submit">
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

PostForm.propTypes = {
  /**
   * The users avatar URL.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The users name.
   */
  name: PropTypes.string.isRequired,
  /**
   * When the post was last updated.
   */
  lastUpdate: PropTypes.string.isRequired,
  /**
   * The post bodies initial value for editing post.
   */
  detailsInitialValue: PropTypes.string,
  /**
   * Function to call on submit.
   */
  onSubmit: PropTypes.func.isRequired,
};
