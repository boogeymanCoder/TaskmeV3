import { Alert, Snackbar, Typography } from "@mui/material";
import React from "react";

function AlertMessage({ severity, anchorOrigin, message, open, setOpen, typographyParams }) {
  return (
    <Snackbar open={open} anchorOrigin={anchorOrigin}>
      <Alert severity={severity} sx={{ width: "100%" }} onClose={(e) => setOpen(!open)}>
        {!typographyParams && (
          <Typography variant="p" component="p" color="inherit">
            {message}
          </Typography>
        )}
        {typographyParams && <Typography {...typographyParams}>{message}</Typography>}
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
