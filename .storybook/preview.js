import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as Emotion10ThemeProvider } from "emotion-theming";
import { theme } from "/src/theme";
import StorybookFirebase from "/src/components/sb/StorybookFirebase";
import { Snackbar, Alert } from "@mui/material";
import { Loop } from "@material-ui/icons";

const defaultTheme = theme; // or your custom theme

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

const withFirebase = (Story, context) => {
  return (
    <StorybookFirebase>
      <Snackbar autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="info" sx={{ margin: 1 }}>
          Rerun interactions after editing values by clicking this icon at the top
          <Loop fontSize="small" />.
        </Alert>
      </Snackbar>
      <Story {...context} />
    </StorybookFirebase>
  );
};

export const decorators = [withFirebase, withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
