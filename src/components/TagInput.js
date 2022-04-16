import { Chip, Box, Grid, TextField, Container } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Allows the user to input multiple values, best usable on tag input or any similar features.
 * Press space to enter a new tag.
 */
export default function TagInput({ tags, setTags, label, chipProps, textFieldProps, ...props }) {
  function addTag(tag) {
    const newTags = tags.filter((value) => value !== tag);
    setTags([...newTags, tag]);
  }

  function removeTag(tag) {
    const newTags = tags.filter((value) => value !== tag);
    setTags(newTags);
  }

  function handleClick(e) {
    const value = e.target.value;
    if (value.slice(-1) == " ") {
      addTag(value.trim());
      e.target.value = "";
    }
  }

  return (
    <Box container sx={props.sx}>
      <Grid container>
        {tags.map((tag) => (
          <Grid item key={tag} sx={{ mb: 1 }}>
            <Chip
              label={tag}
              sx={{ mr: 1 }}
              color="primary"
              onDelete={() => removeTag(tag)}
              {...chipProps}
            />
          </Grid>
        ))}
      </Grid>
      <TextField
        label={label}
        type="text"
        fullWidth
        variant="outlined"
        onInput={handleClick}
        {...textFieldProps}
      />
    </Box>
  );
}

TagInput.propTypes = {
  /**
   * The array of selected values.
   */
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * The setter for the tags.
   */
  setTags: PropTypes.func.isRequired,
  /**
   * Label for the underlying MUI TextField component.
   */
  label: PropTypes.string.isRequired,
  /**
   * Props for the underlying MUI Chip component.
   */
  chipProps: PropTypes.object,
  /**
   * Props for the underlying MUI TextField component.
   */
  textFieldProps: PropTypes.object,
};
