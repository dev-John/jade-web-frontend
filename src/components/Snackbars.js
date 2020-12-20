import React, { useEffect } from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';

import Alert from '../containers/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Snackbars({ alertMsg, type, dismissAlert }) {
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = React.useState(false);

  useEffect(() => {
    setAlertOpen(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dismissAlert();
    setAlertOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} alertType={type} message={alertMsg} />
      </Snackbar>
    </div>
  );
}

export default Snackbars;
