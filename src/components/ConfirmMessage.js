import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function ConfirmMessage({ title, message, onAgree, onDisagree, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
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
