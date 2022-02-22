import { Send } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

export default function NewApplication() {
  const [message, setMessage] = useState("");

  function apply(e) {
    console.log(`Applied! Message: ${message}`);
  }
  return (
    <TextField
      autoFocus
      multiline
      fullWidth
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      variant="standard"
      label="Application message"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={apply}>
              <Send fontSize="large" color="primary" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
