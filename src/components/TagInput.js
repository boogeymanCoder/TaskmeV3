import { Chip, Box, Grid, TextField, Container } from "@mui/material";
import React, { useState } from "react";

export default function TagInput({ tags, setTags, label, ...props }) {
  console.log({ tags });
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
            <Chip label={tag} sx={{ mr: 1 }} color="primary" onDelete={() => removeTag(tag)} />
          </Grid>
        ))}
      </Grid>
      <TextField
        label={label}
        type="text"
        fullWidth
        variant="outlined"
        onInput={handleClick}
        {...props}
      />
    </Box>
  );
}
