import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import ConfirmMessage from "../ConfirmMessage";
import { MoreVert } from "@mui/icons-material";
import { CommentForm } from "./CommentForm";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { removeComment } from "/src/services/comment";

export function Comment({ commentData }) {
  const auth = getAuth();
  const database = getDatabase();
  const [user, userLoading, userError] = useAuthState(auth);
  const [account, accountLoading, accountError] = useObjectVal(
    ref(database, `accounts/${commentData?.owner}`),
    { keyField: "uid" }
  );
  const [commentFormOpen, setCommentFormOpen] = useState(false);

  async function handleDeleteComment() {
    return removeComment(commentData.uid);
  }

  if (!account || accountLoading || accountError || !user || userLoading || userError)
    return <LinearProgress />;

  return (
    <>
      <CommentView
        avatar={account.image}
        name={account.fullname}
        body={commentData.body}
        lastUpdate="2 minutes ago"
        isOwned={user.uid === account.uid}
        onEdit={() => setCommentFormOpen(true)}
        onDelete={handleDeleteComment}
      />
      <Dialog open={commentFormOpen} onClose={() => setCommentFormOpen(false)}>
        <CommentForm
          targetUid={commentData.target}
          mode="edit"
          commentData={commentData}
          onFinish={() => setCommentFormOpen(false)}
        />
      </Dialog>
    </>
  );
}

export function CommentMenu({ onEdit, onDelete }) {
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
        title="Delete Comment?"
        message="After deletion, this comment can no longer be seen."
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
 * Shows users comment on forum page.
 */
export default function CommentView({
  avatar,
  name,
  lastUpdate,
  body,
  isOwned = false,
  onEdit,
  onDelete,
}) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        title={
          <>
            <Typography component="span" sx={{ marginRight: 1 }} variant="h6">
              {name}
            </Typography>
            <Typography component="span" variant="subtitle2">
              {lastUpdate}
            </Typography>
          </>
        }
        subheader={body}
        action={<>{isOwned && <CommentMenu onEdit={onEdit} onDelete={onDelete} />}</>}
      />
    </Card>
  );
}

CommentView.default = {
  isOwned: false,
};
CommentView.propTypes = {
  /**
   * The users image url.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The users name.
   */
  name: PropTypes.string.isRequired,
  /**
   * When the comment was last updated.
   */
  lastUpdate: PropTypes.string.isRequired,
  /**
   * The comment body.
   */
  body: PropTypes.string.isRequired,
  /**
   * Whether the comment is owned or not.
   */
  isOwned: PropTypes.bool,
  /**
   * Function to call on edit, requires isOwned = true.
   */
  onEdit: PropTypes.func,
  /**
   * Function to call on delete, requires isOwned = true.
   */
  onDelete: PropTypes.func,
};
