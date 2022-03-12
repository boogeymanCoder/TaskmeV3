import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

/**
 * Displays user messages.
 */
export default function Message({ image, message, isOwned }) {
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
        {/* <Grid item md={"auto"} sm={11}> */}
        <Grid
          container
          sx={{ height: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item xs>
            <Typography
              paragraph
              color="primary.contrastText"
              bgcolor="primary.main"
              sx={{
                m: 1,
                padding: 1,
                borderRadius: 1,
                borderTopLeftRadius: 0,
                wordWrap: "break-word",
              }}
            >
              {message}
            </Typography>
          </Grid>
        </Grid>
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
};
