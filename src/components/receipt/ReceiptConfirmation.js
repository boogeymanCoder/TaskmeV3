import {
  Alert,
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
  LinearProgress,
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
import { equalTo, getDatabase, limitToLast, orderByChild, query, ref } from "firebase/database";
import { useEffect } from "react";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import { useRouter } from "next/router";
import { setReceipt } from "/src/services/receipt";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import SnackbarMessage from "../SnackbarMessage";
import { updateReceipt } from "/src/services/receipt";

export function ReceiptConfirmation({ application, onFinish }) {
  console.log({ application });
  const router = useRouter();

  const database = getDatabase();

  const employerRef = ref(database, `accounts/${application.employer}`);
  const [employer, employerLoading, employerError] = useObjectVal(employerRef, { keyField: "uid" });
  useEffect(
    () => console.log({ employer, employerLoading, employerError }),
    [employer, employerLoading, employerError]
  );

  const employeeRef = ref(database, `accounts/${application.employee}`);
  const [employee, employeeLoading, employeeError] = useObjectVal(employeeRef, { keyField: "uid" });
  useEffect(
    () => console.log({ employee, employeeLoading, employeeError }),
    [employee, employeeLoading, employeeError]
  );

  const taskRef = ref(database, `tasks/${application.task}`);
  const [task, taskLoading, taskError] = useObjectVal(taskRef, { keyField: "uid" });
  useEffect(() => console.log({ task, taskLoading, taskError }), [task, taskLoading, taskError]);

  const receiptRef = ref(database, "receipts");
  const [receipt, receiptLoading, receiptError] = useListVals(
    query(receiptRef, orderByChild("application"), equalTo(application.uid), limitToLast(1)),
    { keyField: "uid" }
  );
  useEffect(
    () => console.log({ receipt, receiptLoading, receiptError }),
    [receipt, receiptLoading, receiptError]
  );

  if (
    !employer ||
    employerLoading ||
    employerError ||
    !employee ||
    employerLoading ||
    employerError ||
    !task ||
    taskLoading ||
    taskError ||
    !receipt ||
    receiptLoading ||
    receiptError
  )
    return <LinearProgress />;

  if (receipt.length < 1) {
    return <Alert severity="info">No receipt found</Alert>;
  }

  function onViewEmployer() {
    router.push(`/account/${employer.uid}`);
  }
  function onViewTask() {
    router.push(`/tasks/${task.uid}`);
  }
  function onViewEmployee() {
    router.push(`/account/${employee.uid}`);
  }

  function confirmHandler(values) {
    console.log("Submitted:", { values });
    const receiptValues = {
      ...receipt[0],
      confirmed: values.confirmed,
    };

    return updateReceipt(receipt[0].uid, receiptValues).then(onFinish);
  }

  const images = [
    "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1583521214690-73421a1829a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/flagged/photo-1558963675-94dc9c4a66a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  ];

  return (
    <ReceiptConfirmationView
      employer={employer}
      task={task}
      employee={employee}
      images={images}
      onViewEmployer={onViewEmployer}
      onViewTask={onViewTask}
      onViewEmployee={onViewEmployee}
      onSubmit={confirmHandler}
      receivedPayment={receipt.length > 0 ? receipt[0].payment_received : undefined}
    />
  );
}

export default function ReceiptConfirmationView({
  employer,
  task,
  employee,
  receivedPayment,
  images = [],
  onViewEmployer,
  onViewTask,
  onViewEmployee,
  onSubmit,
}) {
  const formik = useFormik({
    initialValues: {
      confirmed: true,
    },
    validationSchema: Yup.object({
      confirmed: Yup.bool().required(),
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
                avatar={employer.image}
                title={employer.fullname}
                subtitle="Employer"
                action={
                  <IconButton sx={{ m: 1 }} onClick={onViewEmployer}>
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
                  <IconButton sx={{ m: 1 }} onClick={onViewTask}>
                    <Visibility />
                  </IconButton>
                }
                sx={{ m: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ReceiptField
                avatar={employee.image}
                title={employee.fullname}
                subtitle="Employee"
                action={
                  <IconButton sx={{ m: 1 }} onClick={onViewEmployee}>
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
                disabled={formik.isSubmitting}
                fullWidth
                label="Payment received"
                type="number"
                variant="outlined"
                name="payment_received"
                InputProps={{
                  endAdornment: <InputAdornment position="start">{task.currency}</InputAdornment>,
                  readOnly: true,
                }}
                value={receivedPayment}
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
            Confirm
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

ReceiptConfirmationView.propTypes = {
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
   * The received amount of the employee.
   */
  receivedPayment: PropTypes.number.isRequired,
  /**
   * The uploaded images.
   */
  images: PropTypes.array,
  /**
   * Function to call when viewing employer.
   */
  onViewEmployer: PropTypes.func.isRequired,
  /**
   * Function to call when viewing task.
   */
  onViewTask: PropTypes.func.isRequired,
  /**
   * Function to call when viewing employee.
   */
  onViewEmployee: PropTypes.func.isRequired,
  /**
   * The function to call on submit.
   */
  onSubmit: PropTypes.func.isRequired,
};

ReceiptConfirmationView.default = { images: [] };
