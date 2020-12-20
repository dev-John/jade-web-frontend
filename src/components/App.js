import React from 'react';
import { Container, CssBaseline, makeStyles, LinearProgress } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import theme from '../theme';
import { useCommonStyles } from '../styles';
import Snackbars from '../containers/Snackbars';
import Routes from '../routes';

const useStyles = makeStyles({
  container: {
    maxWidth: '100%',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(4),
  },
});

function App({ error, success, info, alert, fetching }) {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const resolveVisibility = (isVisible) =>
    isVisible ? commonClasses.visible : commonClasses.hidden;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          {error ? <Snackbars alertMsg={error} type="error" /> : ''}
          {success ? <Snackbars alertMsg={success} type="success" /> : ''}
          {info ? <Snackbars alertMsg={info} type="info" /> : ''}
          {alert ? <Snackbars alertMsg={alert} type="alert" /> : ''}
          <main>
            <Container className={classes.container}>
              <div
                className={`${commonClasses.linearProgressContainer} ${resolveVisibility(
                  fetching
                )}`}
              >
                <LinearProgress />
              </div>
              <ThemeProvider theme={theme}>
                <Routes />
              </ThemeProvider>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
