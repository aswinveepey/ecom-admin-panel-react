import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Poppins", sans-serif`,
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      light: "#758afe",
      main: "#13424C",
      dark: "#0D2E35",
      contrastText: "#fff",
    },
    secondary: {
      light: "#5b874b",
      main: "#4C1336",
      dark: "#350D26",
      contrastText: "#fff",
    },
  },
});

export default theme;
