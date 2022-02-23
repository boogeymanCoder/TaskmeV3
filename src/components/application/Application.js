import { CheckCircle, Clear } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { getDatabase, ref } from "firebase/database";
import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { removeApplication, updateApplication } from "src/services/application";
import SnackbarErrorMessage from "../SnackbarErrorMessage";

export default function Application({ application, isEmployer }) {
  const database = getDatabase();
  const employeeRef = ref(database, `accounts/${application.employee}`);
  const [employee, employeeLoading, employeeError] = useObjectVal(employeeRef);
  console.log({ application, employee, employeeLoading, employeeError });

  function handleAccept() {
    console.log("Accepted!");
    updateApplication(application.uid, { ...application, accepted: true })
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }

  function handleReject() {
    console.log("Rejected!");
    removeApplication(application.uid)
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }

  if (employeeLoading) return <LinearProgress />;
  if (!employeeLoading && !employee) return null;

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            src={employee.image}
            sx={{
              height: 40,
              ml: 1,
              width: 40,
            }}
          />
        </ListItemAvatar>
        <ListItemText primary={application.message} secondary={employee.fullname} />
        <ListItemSecondaryAction>
          {isEmployer && (
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <IconButton onClick={handleAccept}>
                  <CheckCircle color="success" />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <IconButton onClick={handleReject}>
                  <Clear color="error" />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {!isEmployer && application.accepted && (
            <Chip label="Accepted" sx={{ mr: 1 }} color="success" />
          )}
          {!isEmployer && !application.accepted && (
            <Chip
              icon={<CircularProgress size="1rem" />}
              label="Pending"
              sx={{ mr: 1 }}
              color="grey"
            />
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <SnackbarErrorMessage error={employeeError} />
    </>
  );
}
