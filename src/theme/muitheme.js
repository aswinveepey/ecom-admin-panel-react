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
      dark: "#3a4cb1",
      contrastText: "#fff",
    },
    secondary: {
      light: "#5b874b",
      main: "#218490",
      dark: "#234915",
      contrastText: "#fff",
    },
  },
});

export default theme;
