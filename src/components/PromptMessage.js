import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function PromptMessage({
  title,
  message,
  open,
  handleClose,
  setValue,
  handleSubmit,
  label,
  type,
  value,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={label ? label : "Email Address"}
          type={type ? type : "email"}
          fullWidth
          variant="standard"
          onChange={setValue}
          defaultValue={value ? value : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
