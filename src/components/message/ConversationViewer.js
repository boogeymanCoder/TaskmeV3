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
  Button,
} from "@mui/material";
import { Add, MenuOpen, Search } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { IconButton } from "@material-ui/core";

/**
 * Allow users to search for conversations.
 */
export default function ConversationViewer({
  onSearch,
  conversations,
  onClick,
  drawer = false,
  onClose,
}) {
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
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={2} sx={{ display: drawer ? null : "none" }}>
                <Button color="primary" onClick={onClose} sx={{ display: drawer ? null : "none" }}>
                  <MenuOpen />
                </Button>
              </Grid>
              <Grid item xs={drawer ? 10 : 12}>
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
              </Grid>
            </Grid>
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
  /**
   * Whether on drawer mode.
   */
  drawer: PropTypes.bool,
  /**
   * Function to call on closing drawer, requires drawer = true.
   */
  onClose: PropTypes.func.isRequired,
};
