import React from "react";
import { Badge, CircularProgress, IconButton } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SnackbarErrorMessage from "./SnackbarErrorMessage";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import PropTypes from "prop-types";

/**
 * The up icon can be used on tasks, forum, comment, etc. It allows users to put approvals to
 * tasks, forum posts, comments and others.
 */
export default function Ups({ ups, addUp, unUp }) {
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  if (userLoading) return <CircularProgress />;

  return (
    <>
      <Badge
        showZero={true}
        variant={userLoading ? "dot" : "standard"}
        badgeContent={ups.length}
        color="secondary"
      >
        {!user && <CircularProgress />}
        {!ups.includes(user.uid) && (
          <IconButton onClick={() => addUp(user.uid)}>
            <ThumbUpOutlinedIcon fontSize="small" color="action" />
          </IconButton>
        )}
        {ups.includes(user.uid) && (
          <IconButton onClick={() => unUp(user.uid)}>
            <ThumbUpIcon fontSize="small" color="action" />
          </IconButton>
        )}
      </Badge>
      <SnackbarErrorMessage error={userError} />
    </>
  );
}

Ups.propTypes = {
  /**
   * The array of user's uid that approved.
   */
  ups: PropTypes.array.isRequired,
  /**
   * Function to call when user approves.
   */
  addUp: PropTypes.func.isRequired,
  /**
   * Function to call when user disapproves.
   */
  unUp: PropTypes.func.isRequired,
};
