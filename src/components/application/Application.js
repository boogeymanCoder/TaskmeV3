import { CheckCircle, Clear } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { getDatabase, ref } from "firebase/database";
import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import SnackbarErrorMessage from "../SnackbarErrorMessage";

export default function Application({ application }) {
  const database = getDatabase();
  const employeeRef = ref(database, `accounts/${application.employee}`);
  const [employee, employeeLoading, employeeError] = useObjectVal(employeeRef);

  if (employeeLoading || !employee) return <LinearProgress />;

  return (
    <>
      <ListItem
        secondaryAction={
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <IconButton>
                <CheckCircle color="success" />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton>
                <Clear color="error" />
              </IconButton>
            </Grid>
          </Grid>
        }
      >
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
      </ListItem>
      <SnackbarErrorMessage error={employeeError} />
    </>
  );
}
