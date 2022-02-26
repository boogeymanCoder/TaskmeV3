import { CheckCircle, Clear, Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { Clock } from "src/icons/clock";
import { removeApplication, updateApplication } from "src/services/application";
import PromptMessage from "../PromptMessage";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import moment from "moment";

export default function Application({ applicationData, isEmployer }) {
  console.log({ applicationData });
  const application = useMemo(() => {
    return {
      ...applicationData,
      createdAt: JSON.parse(applicationData.createdAt),
      updatedAt: JSON.parse(applicationData.updatedAt),
    };
  }, [applicationData]);
  const [editOpen, setEditOpen] = useState(false);
  const [message, setMessage] = useState(application.message);

  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const database = getDatabase();
  const employeeRef = ref(database, `accounts/${application.employee}`);
  const [employee, employeeLoading, employeeError] = useObjectVal(employeeRef, { keyField: "uid" });
  console.log({ application, user, employee, employeeLoading, employeeError });

  const [updatedAt, setUpdatedAt] = useState(moment(application.updatedAt).fromNow());
  setInterval(() => {
    setUpdatedAt(moment(application.updatedAt).fromNow());
  }, 60000);

  useEffect(() => {
    console.log("updated with useEffect!");
    setUpdatedAt(moment(application.updatedAt).fromNow());
  }, [application]);

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

  function handleEdit() {
    console.log("Edited!");
    updateApplication(application.uid, { ...application, message })
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }

  if (employeeLoading || userLoading) return <LinearProgress />;
  if (!employeeLoading && !employee) {
    console.log({ application });
    // removeApplication(application.uid);
    return null;
  }

  return (
    <>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ ml: 3, mt: 2, mb: 0 }}>
          <Typography variant="h5">{application.message}</Typography>
        </Grid>
        <Grid item xs>
          <Grid container xs sx={{ mt: 3 }}>
            <Grid item>
              {employeeLoading ? (
                <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
              ) : (
                <Avatar
                  src={employee ? employee.image : ""}
                  width={40}
                  height={40}
                  sx={{ mr: 2 }}
                />
              )}
            </Grid>
            <Grid item xs>
              <Grid container>
                <Grid
                  item
                  sx={{
                    alignItems: "center",
                  }}
                  xs={12}
                >
                  {employeeLoading ? (
                    <Skeleton width="100%" variant="text" />
                  ) : (
                    <Typography color="textPrimary" variant="body1">
                      {employee ? employee.fullname : ""}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  xs={12}
                >
                  <Clock fontSize="small" color="action" />
                  <Typography
                    color="textSecondary"
                    display="inline"
                    sx={{ pl: 1 }}
                    variant="caption"
                  >
                    {updatedAt}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm="auto" xs={12}>
          {application.accepted && (
            <Chip
              label="Accepted"
              sx={{ mr: 1 }}
              color="success"
              onDelete={employee.uid === user.uid || isEmployer ? handleReject : false}
            />
          )}
          {isEmployer && !application.accepted && (
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
          {!isEmployer && !application.accepted && (
            <Grid
              container
              spacing={1}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs="auto" direction="row" justifyContent="center" alignItems="center">
                <Chip
                  icon={<CircularProgress size="1rem" />}
                  label="Pending"
                  color="grey"
                  sx={{
                    mx: "auto",
                  }}
                />
              </Grid>
              {employee.uid === user.uid && (
                <Grid item xs="auto">
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={6} direction="row" justifyContent="center" alignItems="center">
                      <IconButton onClick={(e) => setEditOpen(true)}>
                        <Edit color="warning" />
                      </IconButton>
                    </Grid>
                    <Grid item xs={6} direction="row" justifyContent="center" alignItems="center">
                      <IconButton onClick={handleReject}>
                        <Delete color="error" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      <SnackbarErrorMessage error={employeeError} />
      <SnackbarErrorMessage error={userError} />
      <PromptMessage
        title="Edit application"
        message="Please enter new application information"
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        setValue={(e) => setMessage(e.target.value)}
        handleSubmit={(e) => {
          handleEdit(e);
          setEditOpen(false);
        }}
        label="Application message"
        type="text"
        value={message}
      />
    </>
  );
}
