import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Input,
  Button,
} from "@mui/material";
import EmojiSymbols from "@mui/icons-material/EmojiSymbols";
import { AddBox, AttachFile, InsertEmoticon, PhotoCamera, Send } from "@mui/icons-material";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import * as Yup from "yup";
import { useFormik } from "formik";

/**
 * Allow user to create messages, add emojis, and upload files to the conversation.
 */
export default function MessageInput({ onSend, onUploadFile, onUploadImage }) {
  // popup
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleEmojiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEmojiClose = () => {
    setAnchorEl(null);
  };

  // emoji input
  const onEmojiClick = (event, emojiObject) => {
    console.log({ emojiObject });
    // setMessage((prevMessage) => {
    //   return prevMessage + emojiObject.emoji;
    // });
    formik.setFieldValue("message", formik.values.message + emojiObject.emoji);
  };

  // form
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      const messageText = values.message;
      formik.resetForm();
      return onSend(messageText);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Grid container direction="row" justifyContent="center" alignItems="flex-end">
        <Grid item xs>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton component="label">
                    <AttachFile color="primary" />
                    <input type="file" accept="" hidden multiple={false} onChange={onUploadFile} />
                  </IconButton>
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={handleEmojiClick}
                    id="icon-button"
                    aria-controls={open ? "emoji-picker" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <InsertEmoticon color="primary" />
                  </IconButton>

                  <Menu
                    id="emoji-picker"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleEmojiClose}
                    MenuListProps={{
                      "aria-labelledby": "icon-button",
                    }}
                  >
                    <Picker
                      onEmojiClick={onEmojiClick}
                      disableAutoFocus={true}
                      skinTone={SKIN_TONE_MEDIUM_DARK}
                      groupNames={{ smileys_people: "PEOPLE" }}
                    />
                  </Menu>
                </InputAdornment>
              ),
            }}
            disabled={formik.isSubmitting}
            error={Boolean(formik.touched.message && formik.errors.message)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.message}
            name="message"
            required
            multiline
            maxRows={6}
            fullWidth
            autoFocus
            label="Message"
            variant="outlined"
          />
          <Menu
            id="emoji-picker"
            anchorEl={anchorEl}
            open={open}
            onClose={handleEmojiClose}
            MenuListProps={{
              "aria-labelledby": "icon-button",
            }}
          >
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              groupNames={{ smileys_people: "PEOPLE" }}
            />
          </Menu>
        </Grid>
        <Grid item>
          <IconButton type="submit">
            <Send color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
}

MessageInput.propTypes = {
  /**
   * Function to call when user sends the message, func(message: string).
   */
  onSend: PropTypes.func.isRequired,
  /**
   * Function to call when user uploads a file, func(file: object).
   */
  onUploadFile: PropTypes.func.isRequired,
  /**
   * Function to call when user uploads an image, func(image: object).
   */
  onUploadImage: PropTypes.func.isRequired,
};