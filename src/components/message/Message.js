import { Avatar, Badge, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Check } from "@mui/icons-material";
import { get, getDatabase, ref } from "firebase/database";
import { CircularProgress } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useObjectVal } from "react-firebase-hooks/database";

export function FirebaseMessage({ id }) {
  const database = getDatabase();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [message, messageLoading, messageError] = useObjectVal(
    ref(database, `conversations/dummy`),
    {
      keyField: "uid",
    }
  );

  if (userLoading || !user || messageLoading) return <CircularProgress />;

  return (
    <Message
      image={user.photoURL}
      message={message}
      isOwned={user.uid === message.sender}
      sentAt={message.sentAt}
    />
  );
}

/**
 * Displays user messages.
 */
export default function Message({ image, message, isOwned, id, sentAt, isDelivered = false }) {
  const border = isOwned
    ? { borderRadius: 1, borderTopRightRadius: 0 }
    : { borderRadius: 1, borderTopLeftRadius: 0 };
  return (
    <Grid
      container
      direction={isOwned ? "row-reverse" : "row"}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Grid item>
        <Avatar src={image} />
      </Grid>
      <Grid item maxWidth="80%">
        <Tooltip title={sentAt}>
          <Grid
            container
            sx={{ height: "100%" }}
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Grid item xs>
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                overlap="rectangular"
                variant="dot"
                invisible={!isOwned}
                color={isDelivered ? "success" : "warning"}
              >
                <Typography
                  paragraph
                  color="primary.contrastText"
                  bgcolor={isOwned ? "primary.main" : "secondary.main"}
                  sx={{
                    m: 1,
                    padding: 1,
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    ...border,
                  }}
                >
                  {message}
                </Typography>
              </Badge>
            </Grid>
          </Grid>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

Message.propTypes = {
  /**
   * The sender's image url.
   */
  image: PropTypes.string.isRequired,
  /**
   * The body of the message.
   */
  message: PropTypes.string.isRequired,
  /**
   * Whether the message is owned by the current user.
   */
  isOwned: PropTypes.bool.isRequired,
  /**
   * The id of the message.
   */
  id: PropTypes.string.isRequired,
  /**
   * When the message was sent, can be seen when message was hovered.
   */
  sentAt: PropTypes.string.isRequired,
  /**
   * Whether the message was delivered.
   */
  isDelivered: PropTypes.bool,
};

Message.defaultProps = {
  isDelivered: false,
};
