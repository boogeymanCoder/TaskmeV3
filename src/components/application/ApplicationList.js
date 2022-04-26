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
import { removeApplication, updateApplication } from "/src/services/application";
import PropTypes from "prop-types";
import { inviteSendBirdChannelMember } from "/src/services/send_bird/channel";

/**
 * Displays the list of applications.
 */
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

  async function handleAccept(application) {
    console.log("Accepted!");
    await updateApplication(application.uid, { ...application, accepted: true }, false)
      .then(async (res) => {
        console.log({ res });
        inviteSendBirdChannelMember(
          "sendbird_group_channel_360893774_f62df09095dcc8402f586790c8463e1461485fa3",
          { user_ids: [application.employee] }
        );
      })
      .catch((err) => console.log({ err }));
  }

  function handleReject(application) {
    console.log("Rejected!");
    removeApplication(application.uid)
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }

  function handleEdit(application, message) {
    console.log("Edited!");
    updateApplication(application.uid, { ...application, message })
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }

  return (
    <Container {...props}>
      {console.log("No. of Applications:", applications.length)}
      {applications.length === 0 && <Alert severity="info">No Application Yet</Alert>}
      {applications.length > 0 && (
        <Grid container>
          {applications.map((application, index) => {
            if (index >= 6) return null;

            if (index >= 5) {
              return (
                <Accordion key="accordion" sx={{ width: "100%" }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>See more</AccordionSummary>
                  <AccordionDetails>
                    {applications.map((application, index) =>
                      index >= 5 ? (
                        <Application
                          key={application.uid}
                          applicationData={application}
                          isEmployer={isEmployer}
                          handleAccept={handleAccept}
                          handleEdit={handleEdit}
                          handleReject={handleReject}
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
                applicationData={application}
                isEmployer={isEmployer}
                handleAccept={handleAccept}
                handleEdit={handleEdit}
                handleReject={handleReject}
              />
            );
          })}
        </Grid>
      )}
      <SnackbarErrorMessage error={applicationsError} />
    </Container>
  );
}

ApplicationList.propTypes = {
  /**
   * The id of task received from firebase.
   */
  taskId: PropTypes.string.isRequired,
  /**
   * Whether the user is the employer or not.
   */
  isEmployer: PropTypes.bool.isRequired,
  /**
   * Application to call to set the number of application.
   */
  setApplicationCount: PropTypes.func.isRequired,
};
