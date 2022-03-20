import React from "react";
import PropTypes from "prop-types";
import { Card, Grid, useMediaQuery } from "@mui/material";
import ConversationViewer from "./ConversationViewer";
import ChatBar from "./ChatBar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatBox({
  conversationViewerProps,
  chatBarProps,
  messageListProps,
  messageInputProps,
}) {
  const min600 = useMediaQuery("(min-width:600px)");
  return (
    <Grid container sx={{ maxHeight: "100vh", m: 0, p: 0 }}>
      <Grid
        item
        xs={5}
        sx={{
          height: "95vh",
          overflow: "auto",
          display: min600 ? null : "none",
          m: 0,
          p: 0,
        }}
      >
        <ConversationViewer {...conversationViewerProps} />
      </Grid>
      <Grid item xs={min600 ? 7 : 12} sx={{ maxHeight: "100vh", m: 0, p: 0 }}>
        <Grid container sx={{ height: "94vh", overflow: "auto" }}>
          <Grid item xs={12} sx={{ mb: 1 }} position="sticky" top={0}>
            <ChatBar {...chatBarProps} />
          </Grid>
          <Grid item xs={12} zIndex="message_list">
            <MessageList {...messageListProps} />
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }} position="sticky" bottom={0}>
            <MessageInput {...messageInputProps} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ChatBox.propTypes = {
  /**
   * The props to pass for the underlying ConversationViewer component.
   */
  conversationViewerProps: PropTypes.object.isRequired,
  /**
   * The props to pass for the underlying ChatBar component.
   */
  chatBarProps: PropTypes.object.isRequired,
  /**
   * The props to pass for the underlying MessageList component.
   */
  messageListProps: PropTypes.object.isRequired,
  /**
   * The props to pass for the underlying MessageInput component.
   */
  messageInputProps: PropTypes.object.isRequired,
};
