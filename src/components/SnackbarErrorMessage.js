import React from "react";
import SnackbarMessage from "./SnackbarMessage";
import PropTypes from "prop-types";

/**
 * Displays error.message if error isn't null.
 */
export default function SnackbarErrorMessage({ error, alertProps, snackbarProps, ...props }) {
  if (!error) return null;

  return (
    <SnackbarMessage
      message={error.message}
      alertProps={{ severity: "error", ...alertProps }}
      snackbarProps={{ ...snackbarProps }}
      {...props}
    />
  );
}

SnackbarErrorMessage.propTypes = {
  /**
   * The Error object, must have a message property.
   */
  error: PropTypes.object,
  /**
   * Props for the underlying MUI Alert component.
   */
  alertProps: PropTypes.object,
  /**
   * Props for the underlying MUI Snackbar component.
   */
  snackbarProps: PropTypes.object,
};
