import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
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
  return (
    <Grid container>
      <Grid item xs={5} sx={{ maxHeight: "100vh", overflow: "auto" }}>
        <ConversationViewer {...conversationViewerProps} />
      </Grid>
      <Grid item xs={7}>
        <Grid container sx={{ maxHeight: "100vh", overflow: "auto", m: 1 }}>
          <Grid item xs={12} sx={{ my: 1 }}>
            <ChatBar {...chatBarProps} />
          </Grid>
          <Grid item xs={12}>
            <MessageList {...messageListProps} />
          </Grid>
          <Grid item xs={12}>
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
