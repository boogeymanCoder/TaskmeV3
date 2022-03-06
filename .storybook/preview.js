import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as Emotion10ThemeProvider } from "emotion-theming";
import { theme } from "/src/theme";
import StorybookFirebase from "/src/components/sb/StorybookFirebase";

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
