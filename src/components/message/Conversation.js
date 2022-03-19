import React from "react";
import PropTypes from "prop-types";
import { Avatar, Badge, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

/**
 * Displays a conversation.
 */
export default function Conversation({
  avatar,
  title,
  lastMessage,
  lastMessageSent,
  lastSender,
  isRead,
  onClick,
  id,
}) {
  return (
    <Grid
      container
      direction="row"
      // justifyContent="center"
      alignItems="center"
      sx={{ cursor: "pointer" }}
      onClick={() => onClick(id)}
    >
      <Grid item xs={3} sm="auto" sx={{ pr: 1 }}>
        <Avatar
          alt={title}
          src={avatar}
          sx={{
            height: 60,
            width: 60,
          }}
        />
      </Grid>
      <Grid item xs={9} sm>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Badge
              color="primary"
              variant="dot"
              invisible={isRead}
              overlap="rectangular"
              sx={{
                zIndex: "notification_dot",
              }}
            >
              <Typography variant="h6">{title}</Typography>
            </Badge>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ p: 0 }}>
              <Grid item xs={9} sx={{ p: 0 }}>
                <Typography
                  variant="caption"
                  color={!isRead ? "primary" : "text"}
                  noWrap
                  paragraph
                  sx={{ m: 0, p: 0 }}
                >
                  {lastSender && `${lastSender}:`} {lastMessage}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="caption"
                  color={!isRead ? "primary" : "text"}
                  noWrap
                  paragraph
                  textAlign="end"
                  sx={{ m: 0, p: 0 }}
                >
                  {lastMessageSent}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

Conversation.propTypes = {
  /**
   * The image to show, displays titles, first letter if not supplied.
   */
  avatar: PropTypes.string,
  /**
   * Title to display to represent the conversation.
   */
  title: PropTypes.string.isRequired,
  /**
   * Text to show when the last message was sent.
   */
  lastMessageSent: PropTypes.string.isRequired,
  /**
   * Text to show the last message sent.
   */
  lastMessage: PropTypes.string.isRequired,
  /**
   * Text to show the last message sender.
   */
  lastSender: PropTypes.string,
  /**
   * Whether to mark the conversation as read or not.
   */
  isRead: PropTypes.bool.isRequired,
  /**
   * Function to call when clicking the conversation.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * The conversations id.
   */
  id: PropTypes.string.isRequired,
};
