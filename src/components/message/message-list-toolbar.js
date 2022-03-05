import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Select,
  Grid,
  FormControl,
  InputLabel,
  Fab,
  Tooltip,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import PropTypes from "prop-types";

/**
 * Messages toolbar allowing users to add, search or sort messages
 */
export const MessageListToolbar = ({
  handleAddMessage,
  searchEnabled = false,
  sortEnabled = false,
  ...props
}) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Messages
      </Typography>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Tooltip title={searchEnabled ? "" : "Unavailable"}>
                <TextField
                  disabled={!searchEnabled}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search messages"
                  variant="outlined"
                />
              </Tooltip>
            </Grid>
            <Grid item md={6} xs={12}>
              <Tooltip title={sortEnabled ? "" : "Unavailable"}>
                <FormControl fullWidth disabled={!sortEnabled}>
                  <InputLabel id="sortby-select-label">Sort by</InputLabel>
                  <Select labelId="sortby-select-label" label="Sort by" fullWidth />
                </FormControl>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
    <Fab
      onClick={handleAddMessage}
      size="large"
      sx={{
        position: "fixed",
        bottom: "5%",
        right: "5%",
        boxShadow: 3,
        zIndex: "modal",
      }}
      color="primary"
      aria-label="add"
    >
      <Add />
    </Fab>
  </Box>
);

MessageListToolbar.prototype = {
  /**
   * Function to be called when the floating action button has been clicked.
   */
  handleAddMessage: PropTypes.func.isRequired,
  /**
   * Wether the search field was enabled or not, defaults to false.
   */
  searchEnabled: PropTypes.bool,
  /**
   * Wether the sort field was enabled or not, defaults to false.
   */
  sortEnabled: PropTypes.bool,
};
