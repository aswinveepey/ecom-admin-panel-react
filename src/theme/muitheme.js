import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
      contrastText: "#fff",
    },
    secondary: {
      light: "#35e1d1",
      main: "#03DAC6",
      dark: "#02988a",
      contrastText: "#fff",
    },
  },
});

export default theme;
