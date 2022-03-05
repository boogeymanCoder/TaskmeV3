import { Alert, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
/**
 * Displays information to the user, it auto-hides in 6 seconds by default,
 * override this by setting the snackbarProps' autoHideDuration.
 */
function SnackbarMessage({ message, alertProps, snackbarProps }) {
  const [open, setOpen] = useState(true);
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={alertProps?.onClose ? alertProps?.onClose : (e) => setOpen(false)}
      {...snackbarProps}
    >
      <Alert
        severity="success"
        sx={{ width: "100%" }}
        onClose={(e) => setOpen(false)}
        {...alertProps}
      >
        <Typography variant="p" component="p" color="inherit">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}

SnackbarMessage.propTypes = {
  /**
   * The message to show the user.
   */
  message: PropTypes.string.isRequired,
  /**
   * Props for the MUI Alert component.
   */
  alertProps: PropTypes.object,
  /**
   * Props for the MUI Snackbar component.
   */
  snackbarProps: PropTypes.object,
};

export default SnackbarMessage;
