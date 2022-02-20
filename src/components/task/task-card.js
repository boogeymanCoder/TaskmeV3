import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Skeleton,
  Tab,
  Typography,
} from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { Download as DownloadIcon } from "../../icons/download";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { useEffect } from "react";

// const taskRawData = {
//   currency: "P",
//   date: '"2022-02-20T09:50:17.089Z"',
//   details: "For graduation tarpaulin",
//   employer: "q80WSLRkkBNbJNu4bvyaNtHSzAK2",
//   location: "Perino St., Sumpong, Malaybalay City, Bukidnon",
//   open: true,
//   price: 250,
//   skills: "[]",
//   tags: "[]",
//   title: "Edit my photo",
//   ups: "[]",
// };

export const TaskCard = ({ taskData, ...rest }) => {
  const [tab, setTab] = useState("comment");

  const task = {
    ...taskData,
    date: JSON.parse(taskData.date),
    skills: JSON.parse(taskData.skills),
    tags: JSON.parse(taskData.tags),
    ups: JSON.parse(taskData.ups),
  };
  console.log({ task });

  const database = getDatabase();
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
        <Typography align="center" color="textPrimary" gutterBottom variant="h4">
          {task.title}
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle1">
          {task.details}
        </Typography>
        <Grid container sx={{ mt: 3 }} spacing={2}>
          <Grid item sm={6} xs={12}>
            <Skeleton sx={{ mx: "auto" }} variant="rectangular" fullWidth height="100%" />
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
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <ThumbUpOutlinedIcon sx={{ mx: 1 }} fontSize="large" color="action" />
              <Link
                color="textSecondary"
                display="inline"
                sx={{ cursor: "pointer" }}
                variant="body1"
              >
                {task.ups.length}
              </Link>
              <TabList sx={{ mx: 3 }} onChange={handleTabChange} aria-label="lab API tabs example">
                <Tab label="Comment" value="comment" />
                <Tab label="Apply" value="apply" />
              </TabList>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ p: 2 }}>
          <TabPanel value="comment">Comment</TabPanel>
          <TabPanel value="apply">Apply</TabPanel>
        </Box>
      </TabContext>
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};