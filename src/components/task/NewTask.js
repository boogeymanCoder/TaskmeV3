import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TagInput from "../TagInput";
import { FormControl, FormControlLabel, Grid, InputLabel, Select, Switch } from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import { useState } from "react";

export default function NewTask({ open, handleClose }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" scroll="body">
        <DialogTitle>Add task</DialogTitle>
        <DialogContent>
          <DialogContentText>Fields marked with (*) are required.</DialogContentText>
          <TextField margin="dense" label="Name" type="text" fullWidth variant="outlined" />
          <TextField
            margin="dense"
            label="Details"
            type="text"
            fullWidth
            variant="outlined"
            multiline={true}
            minRows={3}
          />
          <TagInput label="Tags (press space to add tag)" />
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TextField label="Currency" type="text" fullWidth variant="outlined" required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Price" type="text" fullWidth variant="outlined" required />
            </Grid>
          </Grid>
          <TagInput label="Skills (press space to add skill)" />
          <DateTimePicker
            value={date}
            onChange={handleDateChange}
            label="Date"
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
            required
          />

          <FormControlLabel control={<Switch defaultChecked />} label="Open" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
