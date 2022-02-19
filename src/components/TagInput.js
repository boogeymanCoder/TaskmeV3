import { Chip, Box, Grid, TextField, Container } from "@mui/material";
import React, { useState } from "react";

export default function TagInput({ label }) {
  const [tags, setTags] = useState([]);

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
    <Box container sx={{ my: 2 }}>
      <Grid container spacing={1}>
        {tags.map((tag) => (
          <Grid item key={tag}>
            <Chip label={tag} color="primary" onDelete={() => removeTag(tag)} />
          </Grid>
        ))}
      </Grid>
      <TextField
        sx={{ mt: 2 }}
        label={label}
        type="text"
        fullWidth
        variant="outlined"
        onInput={handleClick}
      />
    </Box>
  );
}
