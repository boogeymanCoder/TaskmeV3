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
import PropTypes from "prop-types";

/**
 * Allows the user to respond on a modal form, originally made for entering email address.
 */
export default function PromptMessage({
  title,
  message,
  open,
  handleClose,
  setValue,
  handleSubmit,
  label = "Email Address",
  type = "email",
  value = "",
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={label}
          type={type}
          fullWidth
          variant="standard"
          onChange={setValue}
          defaultValue={value}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

PromptMessage.propTypes = {
  /**
   * Title for the prompt modal.
   */
  title: PropTypes.string.isRequired,
  /**
   * Additional information or instruction.
   */
  message: PropTypes.string.isRequired,
  /**
   * Whether the prompt was open or not.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function to call when the prompt was closed.
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Function to call when setting a new value to the prompt.
   */
  setValue: PropTypes.func.isRequired,
  /**
   * Function to call when submitting the prompt.
   */
  handleSubmit: PropTypes.func.isRequired,
  /**
   * The label for the input field.
   */
  label: PropTypes.string,
  /**
   * Any valid input type.
   */
  type: PropTypes.string,
  /**
   * The value of the prompt.
   */
  value: PropTypes.string,
};

PromptMessage.defaultProps = {
  label: "Email Address",
  type: "email",
  value: "",
};
