import { CheckCircle, Clear, Delete, Folder, Person } from "@mui/icons-material";
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  child,
  equalTo,
  getDatabase,
  limitToLast,
  orderByChild,
  orderByKey,
  orderByValue,
  query,
  ref,
} from "firebase/database";
import React from "react";
import { useListVals } from "react-firebase-hooks/database";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import Application from "./Application";

export default function ApplicationList({ taskId, isEmployer }) {
  const database = getDatabase();
  const [applications, applicationsLoading, applicationsError] = useListVals(
    query(ref(database, "applications"), orderByChild("task"), equalTo(taskId)),
    {
      keyField: "uid",
    }
  );

  if (applicationsLoading || !applications) return <LinearProgress />;

  return (
    <Container>
      <Typography>Applications</Typography>
      <List>
        {applications.map((application) => (
          <Application key={application.uid} application={application} isEmployer={isEmployer} />
        ))}
      </List>
      <SnackbarErrorMessage error={applicationsError} />
    </Container>
  );
}
