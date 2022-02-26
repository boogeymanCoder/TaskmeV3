import PropTypes from "prop-types";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Skeleton,
  Tab,
  Typography,
} from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { Download as DownloadIcon } from "../../icons/download";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRef, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { useEffect } from "react";
import UpdateTask from "./UpdateTask";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import NewApplication from "../application/NewApplication";
import ApplicationList from "../application/ApplicationList";

export const TaskCard = ({ taskData, ...rest }) => {
  const [applicationCount, setApplicationCount] = useState(0);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [tab, setTab] = useState("applications");
  const database = getDatabase();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  let task = {
    ...taskData,
    date: JSON.parse(taskData.date),
    skills: JSON.parse(taskData.skills),
    tags: JSON.parse(taskData.tags),
    ups: JSON.parse(taskData.ups),
    comments: JSON.parse(taskData.comments),
  };

  console.log({ task });

  const [employer, employerLoading, employerError] = useObjectVal(
    ref(database, `accounts/${task.employer}`)
  );
  console.log(`tasks/${task.employer}`);
  useEffect(() => {
    console.log({ employer, employerLoading, employerError });
  }, [employer, employerLoading, employerError]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Grid container>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              display: user.uid !== task.employer ? "none" : "initial",
            }}
            sm="auto"
            xs={12}
          >
            <Button
              onClick={() => setUpdateOpen(true)}
              variant="text"
              disabled={userLoading || employerLoading}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs>
            <Typography align="center" color="textPrimary" gutterBottom variant="h4">
              {task.title}
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle1">
              {task.details}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }} spacing={2}>
          <Grid item sm={6} xs={12}>
            <Skeleton sx={{ mx: "auto" }} variant="rectangular" fullWidth height="40vh" />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Grid container>
              <Grid item xs>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Details
                </Typography>
              </Grid>
              <Grid item xs>
                <Chip
                  size="small"
                  label={task.open ? "open" : "close"}
                  sx={{ mr: 1 }}
                  color={task.open ? "success" : "warning"}
                />
              </Grid>
            </Grid>
            <Typography variant="body2">Date: {task.date}</Typography>
            <Typography variant="body2">Location: {task.location}</Typography>
            <Typography variant="body2">Tags:</Typography>
            <Grid container>
              {task.tags.map((tag) => (
                <Grid item key={tag} sx={{ mb: 1 }}>
                  <Chip size="small" label={tag} sx={{ mr: 1 }} color="primary" />
                </Grid>
              ))}
            </Grid>
            <Typography variant="body2">Skills:</Typography>
            <Grid container>
              <Grid item>
                <Grid container>
                  {task.skills.map((tag) => (
                    <Grid item key={tag} sx={{ mb: 1 }}>
                      <Chip size="small" label={tag} sx={{ mr: 1 }} color="primary" />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ justifyContent: "flex-end" }}>
                <Grid container sx={{ mt: 3 }}>
                  <Grid item>
                    {employerLoading ? (
                      <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    ) : (
                      <Avatar
                        src={employer ? employer.image : ""}
                        width={40}
                        height={40}
                        sx={{ mr: 2 }}
                      />
                    )}
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid
                        item
                        sx={{
                          alignItems: "center",
                        }}
                        xs={12}
                      >
                        {employerLoading ? (
                          <Skeleton width="100%" variant="text" />
                        ) : (
                          <Typography color="textPrimary" variant="body1">
                            {employer ? employer.fullname : ""}
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
                        <ClockIcon fontSize="small" color="action" />
                        {/* TODO implement updated when */}
                        <Typography
                          color="textSecondary"
                          display="inline"
                          sx={{ pl: 1 }}
                          variant="caption"
                        >
                          Updated 2hr ago
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <TabContext value={tab}>
        <Box sx={{ p: 2 }}>
          <Grid container fullWidth spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid item xs>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item>
                  <Badge showZero={true} badgeContent={task.ups.length} color="secondary">
                    <IconButton>
                      <ThumbUpOutlinedIcon fontSize="small" color="action" />
                    </IconButton>
                  </Badge>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                alignItems: "center",
              }}
              xs
            >
              <Grid fullWidth container direction="row" justifyContent="center" alignItems="center">
                <TabList
                  sx={{ mx: 3 }}
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label={
                      <Badge showZero={true} badgeContent={applicationCount} color="secondary">
                        <Typography padding={1}>Applications</Typography>
                      </Badge>
                    }
                    value="applications"
                  />
                  <Tab
                    label={
                      <Badge showZero={true} badgeContent={task.comments.length} color="secondary">
                        <Typography padding={1}>Comments</Typography>
                      </Badge>
                    }
                    value="comments"
                  />
                </TabList>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <TabPanel value="applications">
            <NewApplication taskId={task.uid} employer={task.employer} />
            <ApplicationList
              taskId={task.uid}
              isEmployer={user.uid === task.employer}
              setApplicationCount={setApplicationCount}
            />
          </TabPanel>
          <TabPanel value="comments">
            <Alert severity="warning">Comments are not yet available</Alert>
          </TabPanel>
        </Box>
      </TabContext>
      <UpdateTask task={task} open={updateOpen} handleClose={() => setUpdateOpen(false)} />
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};
