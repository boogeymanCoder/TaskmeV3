import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Message, { FirebaseMessage } from "./Message";

/**
 * Displays messages to the user on a list view.
 */
export default function MessageList({ messages }) {
  return (
    <Grid container direction="column">
      {messages.map((message) => (
        <Grid key={message} item xs>
          <FirebaseMessage id={message} />
        </Grid>
      ))}
    </Grid>
  );
}

MessageList.propTypes = {
  /**
   * Array of messages to be displayed.
   */
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};
