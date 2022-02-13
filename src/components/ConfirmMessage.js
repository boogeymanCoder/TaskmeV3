import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function ConfirmMessage({ onAgree, onDisagree, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{"Reset account password?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your account might be compromised, it suggested to change password.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onDisagree}>
          Disagree
        </Button>
        <Button autoFocus onClick={onAgree}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
