import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import ReceiptField from "./ReceiptField";
import { Visibility } from "@material-ui/icons";
import { MoreVert, Upload } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EmployeeForm({ employer, task, employee, images = [], onSubmit }) {
  const formik = useFormik({
    initialValues: {
      payment_received: 0,
    },
    validationSchema: Yup.object({
      payment_received: Yup.number().required("Payment received is required"),
    }),
    onSubmit: async (values) => {
      return onSubmit(values);
    },
  });
  return (
    <Card>
      <form onSubmit={formik.handleSubmit} noValidate>
        <CardHeader
          title="Receipt"
          subheader="This serves as a receipt of the transaction, and confirmation that the tasks terms are fulfilled."
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container direction={"row"} spacing={1}>
            <Grid item xs={12} sm={6}>
              <ReceiptField
                avatar={employer.avatar}
                title={employer.name}
                subtitle="Employer"
                action={
                  <IconButton sx={{ m: 1 }} onClick={() => alert("View Employer!")}>
                    <Visibility />
                  </IconButton>
                }
                sx={{ m: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ReceiptField
                title={task.title}
                subtitle="Task"
                action={
                  <IconButton sx={{ m: 1 }} onClick={() => alert("View Task!")}>
                    <Visibility />
                  </IconButton>
                }
                sx={{ m: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ReceiptField
                avatar={employee.avatar}
                title={employee.name}
                subtitle="Employee"
                action={
                  <IconButton sx={{ m: 1 }} onClick={() => alert("View Employee!")}>
                    <Visibility />
                  </IconButton>
                }
                sx={{ m: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title="Photos"
                  subheader="(optional)"
                  action={
                    <IconButton onClick={() => alert("Upload File!")}>
                      <Upload />
                    </IconButton>
                  }
                />
                <CardMedia>
                  <List
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 0,
                      overflow: "auto",
                      justifyContent: "left",
                    }}
                  >
                    {images.map((image) => {
                      return (
                        <ListItem
                          key={image}
                          style={{
                            width: "10vh",
                            height: "10vh",
                          }}
                        >
                          <img
                            style={{
                              width: "10vh",
                              height: "10vh",
                              objectFit: "cover",
                            }}
                            src={image}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </CardMedia>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Task payment"
                type="number"
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="start">{task.currency}</InputAdornment>,
                  readOnly: true,
                }}
                value={task.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(formik.touched.payment_received && formik.errors.payment_received)}
                helperText={formik.touched.payment_received && formik.errors.payment_received}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.payment_received}
                disabled={formik.isSubmitting}
                fullWidth
                label="Payment received"
                type="number"
                variant="outlined"
                name="payment_received"
                InputProps={{
                  endAdornment: <InputAdornment position="start">{task.currency}</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            sx={{ ml: "auto" }}
            variant="contained"
            disabled={formik.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

EmployeeForm.propTypes = {
  /**
   * The tasks employer data.
   */
  employer: PropTypes.object.isRequired,
  /**
   * The tasks data.
   */
  task: PropTypes.object.isRequired,
  /**
   * The tasks employee data.
   */
  employee: PropTypes.object.isRequired,
  /**
   * The uploaded images.
   */
  images: PropTypes.array,
  /**
   * The function to call on submit.
   */
  onSubmit: PropTypes.func.isRequired,
};

EmployeeForm.default = { images: [] };
