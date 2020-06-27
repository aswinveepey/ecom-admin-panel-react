import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Poppins", sans-serif`,
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  //enable dark theme
  // palette: {
  //   type: "dark",
  // },
  palette: {
    primary: {
      main: "#13424C",
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
