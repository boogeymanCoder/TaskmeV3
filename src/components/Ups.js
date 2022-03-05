import React from "react";
import { Badge, CircularProgress, IconButton } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SnackbarErrorMessage from "./SnackbarErrorMessage";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Ups({ ups, addUp, unUp }) {
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

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
