import React from "react";
import PropTypes from "prop-types";
import Conversation from "./Conversation";
import { Grid, List, ListItem, ListItemButton } from "@mui/material";

/**
 * Displays list of conversations.
 */
export default function ConversationList({ conversations, onClick }) {
  return (
    <List sx={{ border: "1px solid black", width: "100%" }}>
      {conversations.map((conversation) => (
        <ListItemButton sx={{ mb: 1, border: "1px solid red" }}>
          <Conversation {...conversation} onClick={onClick} />
        </ListItemButton>
      ))}
    </List>
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
