import { CheckCircle, Clear, Delete, Folder, Person } from "@mui/icons-material";
import {
  Alert,
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import React, { useEffect } from "react";
import { useListVals } from "react-firebase-hooks/database";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import Application from "./Application";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function ApplicationList({ taskId, isEmployer, setApplicationCount, ...props }) {
  const database = getDatabase();
  const [applications, applicationsLoading, applicationsError] = useListVals(
    query(ref(database, "applications"), orderByChild("task"), equalTo(taskId)),
    {
      keyField: "uid",
    }
  );

  useEffect(() => {
    if (!applicationsLoading && applications) {
      setApplicationCount(applications.length);
    }
  }, [applicationsLoading, applications, setApplicationCount]);

  if (applicationsLoading) return <LinearProgress />;

  return (
    <Container fluid {...props}>
      {console.log("No. of Applications:", applications.length)}
      {applications.length === 0 && <Alert severity="info">No Application Yet</Alert>}
      {applications.length > 0 && (
        <Grid container>
          {applications.map((application, index) => {
            if (index >= 6) return null;

            if (index >= 5) {
              return (
                <Accordion sx={{ width: "100%" }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>See more</AccordionSummary>
                  <AccordionDetails>
                    {applications.map((application, index) =>
                      index >= 5 ? (
                        <Application
                          key={application.uid}
                          application={application}
                          isEmployer={isEmployer}
                        />
                      ) : null
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            }

            return (
              <Application
                key={application.uid}
                application={application}
                isEmployer={isEmployer}
              />
            );
          })}
        </Grid>
      )}
      <SnackbarErrorMessage error={applicationsError} />
    </Container>
  );
}
