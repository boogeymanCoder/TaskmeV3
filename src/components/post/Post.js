import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ForumIcon from "@mui/icons-material/Forum";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import moment from "moment";
import PostForm from "./PostForm";
import { updatePost } from "/src/services/post";
import ConfirmMessage from "../ConfirmMessage";
import { MoreVert } from "@mui/icons-material";
import { deletePost } from "/src/services/post";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function PostCard({ postData }) {
  const [edit, setEdit] = useState(false);
  const auth = getAuth();
  const database = getDatabase();
  const [user, userLoading, userError] = useAuthState(auth);
  const [account, accountLoading, accountError] = useObjectVal(
    ref(database, `accounts/${user?.uid}`)
  );

  useEffect(() => console.log({ user, userLoading, userError }), [user, userLoading, userError]);
  useEffect(
    () => console.log({ account, accountLoading, accountError }),
    [account, accountLoading, accountError]
  );

  async function handlePostEdit(values) {
    console.log({ values });
    return updatePost(postData.uid, {
      ...values,
      createdAt: new Date(JSON.parse(postData.createdAt)),
    }).then((res) => {
      setEdit(false);
      return res;
    });
  }

  async function handlePostDelete() {
    return deletePost(postData.uid);
  }

  if (!user || userLoading || userError || !account || accountLoading || accountError) {
    return <LinearProgress />;
  }

  if (!edit) {
    return (
      <Post
        avatar={account.image}
        name={account.fullname}
        lastUpdate={moment(JSON.parse(postData.updatedAt)).fromNow()}
        details={postData.details}
        onEdit={() => setEdit(true)}
        onDelete={handlePostDelete}
        isOwned={user.uid === postData.owner}
      />
    );
  } else {
    return (
      <PostForm
        avatar={account.image}
        name={account.fullname}
        lastUpdate={moment(JSON.parse(postData.updatedAt)).fromNow()}
        detailsInitialValue={postData.details}
        onSubmit={handlePostEdit}
      />
    );
  }
}

PostCard.propTypes = {
  /**
   * Post data from database.
   */
  postData: PropTypes.object.isRequired,
};

PostCard.default = {
  edit: false,
};

export function PostMenu({ onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
            onEdit();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenConfirmation(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <ConfirmMessage
        title="Delete Post?"
        message="After deletion, this post can no longer be seen and  sent with comments from others."
        onAgree={(e) => {
          onDelete()
            .then((res) => {
              setOpenConfirmation(false);
              handleClose();
            })
            .catch((err) => console.log({ err }));
        }}
        onDisagree={(e) => {
          setOpenConfirmation(false);
          handleClose();
        }}
        open={openConfirmation}
        handleClose={(e) => setOpenConfirmation(false)}
      />
    </>
  );
}
/**
 * Displays forum post.
 */
export default function Post({
  avatar,
  name,
  lastUpdate,
  details,
  onEdit,
  onLike,
  onComment,
  isOwned,
  onDelete,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={<>{isOwned && <PostMenu onEdit={onEdit} onDelete={onDelete} />}</>}
        title={name}
        subheader={lastUpdate}
      />
      <CardContent>
        <Typography>{details}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onLike}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton onClick={onComment}>
          <ForumIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Comments</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

Post.propTypes = {
  /**
   * The users avatar URL.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The users name.
   */
  name: PropTypes.string.isRequired,
  /**
   * When the post was last updated.
   */
  lastUpdate: PropTypes.string.isRequired,
  /**
   * The post body.
   */
  details: PropTypes.string.isRequired,
  /**
   * Function to call on edit.
   */
  onEdit: PropTypes.func.isRequired,
  /**
   * Function to call on like.
   */
  onLike: PropTypes.func.isRequired,
  /**
   * Function to call on comment.
   */
  onComment: PropTypes.func.isRequired,
  /**
   * Whether the post is owned or not.
   */
  isOwned: PropTypes.bool,
  /**
   * Function to call on delete.
   */
  onDelete: PropTypes.func,
};

Post.default = {
  isOwned: false,
};
