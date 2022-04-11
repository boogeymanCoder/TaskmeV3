import { CardHeader } from "@material-ui/core";
import { Avatar, Card, CardContent, Link, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import LinkIcon from "@mui/icons-material/Link";

/**
 * Displays users offers to services.
 */
export default function OfferCard({ name, avatar, lastUpdate, taskLink, taskTitle, details }) {
  return (
    <Card>
      <CardHeader avatar={<Avatar src={avatar} />} title={name} subheader={lastUpdate} />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={taskLink} underline="hover">
            <Typography variant="h5">{taskTitle}</Typography>
          </Link>
        </Box>
        <Typography>{details}</Typography>
      </CardContent>
    </Card>
  );
}

OfferCard.propTypes = {
  /**
   * Name of the user.
   */
  name: PropTypes.string.isRequired,
  /**
   * The users avatar link.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * When the offer was last updated.
   */
  lastUpdate: PropTypes.string.isRequired,
  /**
   * The proposed tasks link.
   */
  taskLink: PropTypes.string.isRequired,
  /**
   * The proposed tasks title.
   */
  taskTitle: PropTypes.string.isRequired,
};
