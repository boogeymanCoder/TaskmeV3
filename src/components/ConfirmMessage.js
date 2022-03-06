import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

/**
 * Displays confirmation dialog to the user.
 */
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

ConfirmMessage.propTypes = {
  /**
   * Title of the confirmation modal.
   */
  title: PropTypes.string.isRequired,
  /**
   * Additional information.
   */
  message: PropTypes.string.isRequired,
  /**
   * Function to call when the user disagrees.
   */
  onAgree: PropTypes.func.isRequired,
  /**
   * Function to call when the user disagrees.
   */
  onDisagree: PropTypes.func.isRequired,
  /**
   * Whether it is open or not.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function to call when the modal was closed without choosing (when the backdrop was clicked).
   */
  handleClose: PropTypes.func.isRequired,
};
