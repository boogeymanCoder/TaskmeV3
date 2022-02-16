import React from "react";
import SnackbarMessage from "./SnackbarMessage";

export default function SnackbarErrorMessage({ error, alertProps, snackbarProps }) {
  if (!error) return null;

  return (
    <SnackbarMessage
      message={error.message}
      alertProps={{ severity: "error", ...alertProps }}
      snackbarProps={{ anchorOrigin: { vertical: "top", horizontal: "center" }, ...snackbarProps }}
    />
  );
}
