import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import { Tooltip } from "chart.js";

/**
 * Shows users comment on forum page.
 */
export default function Comment({ avatar, name, lastUpdate, body }) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        title={
          <>
            <Typography component="span" sx={{ marginRight: 1 }} variant="h6">
              {name}
            </Typography>
            <Typography component="span" variant="subtitle2">
              {lastUpdate}
            </Typography>
          </>
        }
        subheader={body}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
    </Card>
  );
}

Comment.propTypes = {
  /**
   * The users image url.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The users name.
   */
  name: PropTypes.string.isRequired,
  /**
   * The comment body.
   */
  body: PropTypes.string.isRequired,
};
