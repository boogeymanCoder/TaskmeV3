import PropTypes from "prop-types";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  LinearProgress,
  Link,
  Skeleton,
  Stack,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Clock as ClockIcon } from "../../icons/clock";
import { Download as DownloadIcon } from "../../icons/download";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRef, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import {
  getDatabase,
  ref,
  child,
  equalTo,
  limitToLast,
  orderByChild,
  orderByKey,
  orderByValue,
  query,
} from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { useEffect } from "react";
import UpdateTask from "./UpdateTask";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import NewApplication from "../application/NewApplication";
import ApplicationList from "../application/ApplicationList";
import Ups from "../Ups";
import { updateTask, updateTaskUps } from "/src/services/task";
import { getDownloadURL, getStorage, list, ref as storageRef } from "firebase/storage";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import copy from "copy-to-clipboard";
import SnackbarMessage from "../SnackbarMessage";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useListVals } from "react-firebase-hooks/database";
import ConfirmMessage from "../ConfirmMessage";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import { deleteTask } from "/src/services/task";

function TaskCardMenu({ isOwned, onCopy, onEdit, onDelete }) {
  const [showSuccessCopy, setShowSuccessCopy] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [deleteError, setDeleteError] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            onCopy();
            setShowSuccessCopy(true);
            handleClose();
          }}
        >
          Copy UID
        </MenuItem>
        {isOwned && <Divider />}
        {isOwned && <MenuItem onClick={onEdit}>Edit</MenuItem>}
        {isOwned && <MenuItem onClick={() => setOpenConfirmation(true)}>Delete</MenuItem>}
      </Menu>

      <SnackbarMessage
        message="UID copied to clipboard"
        snackbarProps={{ open: showSuccessCopy }}
        alertProps={{
          onClose: () => setShowSuccessCopy(false),
          icon: <ContentCopyIcon fontSize="inherit" />,
        }}
      />

      <SnackbarErrorMessage
        error={deleteError}
        alertProps={{ onClose: () => setDeleteError(null) }}
      />

      <ConfirmMessage
        title="Delete Task?"
        message="After deletion, this task can no longer be seen and and sent with applications from others."
        onAgree={(e) => {
          onDelete()
            .then((res) => {
              setOpenConfirmation(false);
              handleClose();
            })
            .catch((err) => {
              console.log({ err });
              setOpenConfirmation(false);
              handleClose();
              setDeleteError(err);
            });
        }}
        onDisagree={(e) => {
          setOpenConfirmation(false);
          handleClose();
        }}
        open={openConfirmation}
        handleClose={(e) => setOpenConfirmation(false)}
      />
    </div>
  );
}

/**
 * Displays task information to the users.
 */
export const TaskCard = ({ taskData, host, ...rest }) => {
  const [applicationCount, setApplicationCount] = useState(0);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [tab, setTab] = useState("applications");
  const database = getDatabase();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [images, setImages] = useState([]);
  const storage = getStorage();
  const [fetchingImage, setFetchingImage] = useState(true);
  const [filenames, setFilenames] = useState(new Map());
  const [acceptedApplication, acceptedApplicationLoading, acceptedApplicationError] = useListVals(
    query(
      ref(database, "applications"),
      orderByChild("task_accepted"),
      equalTo(`${taskData.uid}_true`),
      limitToLast(1)
    ),
    {
      keyField: "uid",
    }
  );

  let task = {
    ...taskData,
    date: JSON.parse(taskData.date),
    skills: JSON.parse(taskData.skills),
    tags: JSON.parse(taskData.tags),
    ups: JSON.parse(taskData.ups),
    comments: JSON.parse(taskData.comments),
    createdAt: JSON.parse(taskData.createdAt),
    updatedAt: JSON.parse(taskData.updatedAt),
  };

  const [updatedAt, setUpdatedAt] = useState(moment(task.updatedAt).fromNow());
  setInterval(() => {
    setUpdatedAt(moment(task.updatedAt).fromNow());
  }, 60000);

  const [employer, employerLoading, employerError] = useObjectVal(
    ref(database, `accounts/${task.employer}`)
  );

  useEffect(() => {
    console.log({ employer, employerLoading, employerError });
  }, [employer, employerLoading, employerError]);

  useEffect(() => {
    console.log({ acceptedApplication, acceptedApplicationLoading, acceptedApplicationError });
  }, [acceptedApplication, acceptedApplicationLoading, acceptedApplicationError]);

  useEffect(() => {
    if (fetchingImage) {
      setImages([]);
      list(storageRef(storage, `/task/${task.uid}`))
        .then(async (res) => {
          console.log({ uid: task.uid });
          const updatedFilenames = new Map();
          res.items.forEach((item) => {
            getDownloadURL(item)
              .then((url) => {
                setImages((prev) => [...prev, url]);
                updatedFilenames.set(item.name, url);
              })
              .catch((err) => console.error({ err }));
          });
          setFilenames(updatedFilenames);
          setFetchingImage(false);
        })
        .catch((err) => console.log({ err }));
    }
  }, [fetchingImage]);

  // useEffect(() => {
  //   console.log({ employer, employerLoading, employerError });
  // }, [employer, employerLoading, employerError]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  function unUpHandler(uid) {
    const newUps = task.ups.filter((user) => user !== uid);
    updateTaskUps(task.uid, JSON.stringify(newUps))
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }

  function addUpHandler(uid) {
    updateTaskUps(task.uid, JSON.stringify([...task.ups, uid]))
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }

  function clipboardHandler() {
    const copyResult = copy(task.uid);
    console.log({ copyResult });
  }

  async function deleteHandler() {
    return new Promise((resolve, reject) => {
      if (acceptedApplicationError) reject(acceptedApplicationError.message);
      if (acceptedApplication.length > 0) reject(new Error("Task has accepted application/s"));

      return deleteTask(task.uid)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  if (fetchingImage) return <LinearProgress />;
  if (acceptedApplicationLoading || acceptedApplicationError) return <LinearProgress />;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardHeader
        avatar={
          <Avatar src={employer ? employer.image : ""} width={40} height={40} sx={{ mr: 2 }} />
        }
        title={
          <Link href={`/account/${task.employer}`}>
            <Typography variant="body1" component="span">
              {employer ? employer.fullname : ""}
            </Typography>
          </Link>
        }
        subheader={
          <Stack direction="row" alignItems="center" gap={1}>
            <ClockIcon fontSize="small" color="action" />
            <Typography color="textSecondary" display="inline" variant="caption">
              {updatedAt}
            </Typography>
          </Stack>
        }
        action={
          <TaskCardMenu
            isOwned={user.uid === task.employer}
            onCopy={clipboardHandler}
            onEdit={() => setUpdateOpen(true)}
            onDelete={deleteHandler}
          />
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs>
            <Typography variant="h4" align="center">
              <Link href={`/tasks/${task.uid}`}>{task.title}</Link>
            </Typography>
            <Typography align="center">{task.details}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }} spacing={2}>
          <Grid item sm={6} xs={12}>
            {/* <Skeleton sx={{ mx: "auto" }} variant="rectangular" fullWidth height="40vh" /> */}
            {console.log({ images })}
            {images && (
              <Box sx={{ width: "100%", maxHeight: "50vw", overflowY: "scroll" }}>
                <ImageList variant="masonry" cols={2} gap={5}>
                  {images.map((image) => (
                    <Link key={image} href={image}>
                      <ImageListItem>
                        <img src={image} loading="lazy" alt={image} />
                      </ImageListItem>
                    </Link>
                  ))}
                </ImageList>
              </Box>
            )}
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
            <Typography variant="body2">
              Date: {moment(task.date).format("MMMM Do YYYY, h:mm:ss a")}
            </Typography>
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
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <TabContext value={tab}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid item xs>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item>
                  {/* <Badge showZero={true} badgeContent={task.ups.length} color="secondary">
                    <IconButton>
                      <ThumbUpOutlinedIcon fontSize="small" color="action" />
                    </IconButton>
                  </Badge> */}
                  <Ups ups={task.ups} addUp={addUpHandler} unUp={unUpHandler} />
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
              <Grid container direction="row" justifyContent="center" alignItems="center">
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
      <UpdateTask
        oldImageLinks={images}
        task={task}
        open={updateOpen}
        handleClose={() => {
          setUpdateOpen(false);
          setFetchingImage(true);
        }}
        filenames={filenames}
      />
    </Card>
  );
};

TaskCard.propTypes = {
  /**
   * The task information received from firebase.
   */
  taskData: PropTypes.object.isRequired,
};
