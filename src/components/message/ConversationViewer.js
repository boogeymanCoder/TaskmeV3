import React from "react";
import PropTypes from "prop-types";
import ConversationList from "./ConversationList";
import {
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListSubheader,
  SvgIcon,
  TextField,
  Fab,
  Container,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";

/**
 * Allow users to search for conversations.
 */
export default function ConversationViewer({ onSearch, conversations, onClick }) {
  const formik = useFormik({
    initialValues: {
      query: "",
    },
    validationSchema: Yup.object({
      query: Yup.string(),
    }),
    onSubmit: async (values) => {
      return onSearch(values.query);
    },
  });
  return (
    <List
      subheader={
        <ListSubheader>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              onChange={formik.handleChange}
              name="query"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
              placeholder="Search conversation"
              variant="outlined"
              sx={{ my: 1, position: "sticky" }}
            />
          </form>
        </ListSubheader>
      }
    >
      <ListItem>
        <ConversationList onClick={onClick} conversations={conversations} />
      </ListItem>
    </List>
  );
}

ConversationViewer.propTypes = {
  /**
   * Function to call when the user searches for a conversation.
   */
  onSearch: PropTypes.func.isRequired,
  /**
   * Conversations to display to the user.
   */
  conversations: PropTypes.array.isRequired,
  /**
   * Function to call when the user clicks on a conversation.
   */
  onClick: PropTypes.func.isRequired,
};
