import { createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },

    secondary: {
      main: indigo[900],
    },

    background: {
      paper: '#fff',
      default: '#fff',
    },
  },
});

export default theme;
