import React from "react";
import PropTypes from "prop-types";
import Conversation from "./Conversation";
import { Grid } from "@mui/material";

/**
 * Displays list of conversations.
 */
export default function ConversationList({ conversations, onClick }) {
  return (
    <Grid container>
      {conversations.map((conversation) => (
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Conversation {...conversation} onClick={onClick} />
        </Grid>
      ))}
    </Grid>
  );
}

ConversationList.propTypes = {
  /**
   * The array of conversations.
   */
  conversations: PropTypes.array.isRequired,
  /**
   * The function to call when the user clicks on one conversation.
   */
  onClick: PropTypes.func.isRequired,
};
