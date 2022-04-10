import { Avatar, Badge, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import PropTypes from "prop-types";
import { Call, VideoCall } from "@mui/icons-material";
import moment from "moment";
import { MoreVert } from "@material-ui/icons";

/**
 * Displays Chat information, actions for audio call and video call, and chat menu.
 */
export default function ChatBar({
  image,
  title,
  isActive,
  lastActive,
  onVoiceCall,
  onVideoCall,
  menuActions,
  drawer = false,
  onDrawer,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container direction="row" alignItems="center" bgcolor="white.light" sx={{ padding: 1 }}>
      <Grid item xs={1} sm="auto" sx={{ display: drawer ? null : "none" }}>
        <IconButton color="primary" onClick={onDrawer}>
          <MenuIcon />
        </IconButton>
      </Grid>
      {image && (
        <Grid item xs={2} sm="auto">
          <Badge color="secondary" overlap="circular" badgeContent=" " invisible={!isActive}>
            <Avatar
              src={image}
              sx={{
                height: 40,
                ml: 1,
                width: 40,
              }}
            />
          </Badge>
        </Grid>
      )}
      <Grid item xs={5} sm>
        <Grid container direction="row" alignItems="center" sx={{ height: "100%" }}>
          <Grid item sx={{ pl: 2 }} xs>
            <Typography variant="h5" noWrap color="primary" sx={{ fontSize: "1em" }}>
              {title}
            </Typography>
            {!isActive && (
              <Typography xs variant="subtitle1" color="primary" sx={{ fontSize: ".75em" }}>
                Active {moment(lastActive).fromNow()}
              </Typography>
            )}
            {isActive && (
              <Typography variant="subtitle1" color="primary" sx={{ fontSize: ".75em" }}>
                Active now
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={drawer ? 4 : 5} sm="auto">
        <Grid container align="end" direction="row" alignItems="center" justifyContent="flex-end">
          <Grid item xs={4} sm="auto">
            <IconButton onClick={onVoiceCall}>
              <Call color="primary" />
            </IconButton>
          </Grid>
          <Grid item xs={4} sm="auto">
            <IconButton onClick={onVideoCall}>
              <VideoCall color="primary" />
            </IconButton>
          </Grid>
          <Grid item xs={4} sm="auto">
            <IconButton onClick={handleClick}>
              <MoreVert color="primary" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuActions.map((action) => (
          <MenuItem
            key={action.name}
            onClick={(e) => {
              handleClose(e);
              action.method();
            }}
          >
            {action.name}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
}

ChatBar.propTypes = {
  /**
   * Image to display on the Chat bar.
   */
  image: PropTypes.string,
  /**
   * Title of the chat bar.
   */
  title: PropTypes.string.isRequired,
  /**
   * Function to when user chooses to create a voiceCall.
   */
  onVoiceCall: PropTypes.func.isRequired,
  /**
   * Function to call when user choses to create a video call.
   */
  onVideoCall: PropTypes.func.isRequired,
  /**
   * Array of menu objects {name: String, method: function}.
   */
  menuActions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      method: PropTypes.func.isRequired,
    })
  ),
  /**
   * Whether to be in drawer mode or not
   */
  drawer: PropTypes.bool,
  /**
   * Function to call when opening drawer, requires drawer = true.
   */
  onDrawer: PropTypes.func,
};
