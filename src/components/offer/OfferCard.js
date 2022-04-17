import { CardHeader } from "@material-ui/core";
import { Avatar, Card, CardContent, Link, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import LinkIcon from "@mui/icons-material/Link";

export function OfferCard({ offerData }) {
  return (
    <OfferCard
      avatar="https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1096&q=80"
      details="I am currently looking for a photo editor for my sisters birthday, if you are interested."
      lastUpdate="2 minutes ago"
      name="Anabeth Chase"
      taskLink="#"
      taskTitle="Photo Editing"
    />
  );
}

/**
 * Displays users offers to services.
 */
export default function OfferCardView({
  name,
  avatar,
  lastUpdate,
  taskLink,
  taskTitle,
  details,
  ...props
}) {
  return (
    <Card {...props}>
      <CardHeader avatar={<Avatar src={avatar} />} title={name} subheader={lastUpdate} />
      <CardContent sx={{ paddingTop: 0 }}>
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
