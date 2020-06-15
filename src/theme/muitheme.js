import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#758afe",
      main: "#536dfe",
      dark: "#3a4cb1",
      contrastText: "#fff",
    },
    secondary: {
      light: "#5b874b",
      main: "#33691e",
      dark: "#234915",
      contrastText: "#fff",
    },
  },
});

export default theme;
