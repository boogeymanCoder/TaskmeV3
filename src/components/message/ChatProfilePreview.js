import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Typography } from "@material-ui/core";
import { Call, Message } from "@material-ui/icons";
import { VideoCall } from "@mui/icons-material";

export default function ChatProfilePreview({
  image,
  name,
  address,
  gender,
  onMessage,
  onVoiceCall,
  onVideoCall,
  onViewProfile,
}) {
  return (
    <Card>
      <CardContent>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Avatar
              src={image}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" component="p" align="center" sx={{ p: 0, m: 0 }}>
              {address}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">{gender}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Grid
              container
              columnSpacing={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Tooltip title="Message">
                  <IconButton color="primary" onClick={onMessage}>
                    <Message />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Audio">
                  <IconButton color="primary" onClick={onVoiceCall}>
                    <Call />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Video">
                  <IconButton color="primary" onClick={onVideoCall}>
                    <VideoCall />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Button fullWidth onClick={onViewProfile}>
              View Profile
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

ChatProfilePreview.proptypes = {
  /**
   * The link to the user's link.
   */
  image: PropTypes.string.isRequired,
  /**
   * The users name.
   */
  name: PropTypes.string.isRequired,
  /**
   * The users gender.
   */
  gender: PropTypes.string.isRequired,
  /**
   * The users address.
   */
  address: PropTypes.string.isRequired,
  /**
   * Function to call when personally messaging the user, most used in group conversations
   * but added also on personal conversation for uniformity and simplicity.
   */
  onMessage: PropTypes.func.isRequired,
  /**
   * The function to call when executing audio call to user.
   */
  onVoiceCall: PropTypes.func.isRequired,
  /**
   * The function to call when executing video call to user.
   */
  onVideoCall: PropTypes.func.isRequired,
  /**
   * The function to call when viewing the users profile.
   */
  onViewProfile: PropTypes.func.isRequired,
};
