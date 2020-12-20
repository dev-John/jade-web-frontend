import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ERROR_COLOR = '#f44336';
const ALERT_COLOR = '#ff9800';
const SUCCESS_COLOR = '#4CAF50';
const INFO_COLOR = '#2196F3';

const useStyles = makeStyles((theme) => ({
  alert: {
    padding: '20px',
    color: 'white',
    width: 'fit-content',
    minWidth: '20%',
    alignItems: 'center',
    borderRadius: '5px',
    marginTop: '10px',
  },

  closebtn: {
    marginLeft: '15px',
    color: 'white',
    fontWeight: 'bold',
    float: 'right',
    fontSize: '22px',
    lineHeight: '20px',
    cursor: 'pointer',
    transition: '0.3s',
  },

  customMsg: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    textDecoration: 'none',
    fontWeight: '500',
  },

  button: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  },

  icon: { marginRight: '8px' },
}));

/**
 *
 * @param {*message,alertType} props
 * Esta classe necessita das props message, com um texto e type com o tipo do alerta desejado.
 * Para o type, utilizar os valores definidos em constants.js
 * alertType pode ser 'error','alert','info','success'.
 * Ex: <Alert message={message} alertType='info' />
 */
function Alert({ message, alertType, messageTestid, dismissAlert }) {
  const classes = useStyles();
  const [display, setDisplay] = useState(true);
  const colorDic = {
    error: ERROR_COLOR,
    alert: ALERT_COLOR,
    info: INFO_COLOR,
    success: SUCCESS_COLOR,
  };
  const color = colorDic[alertType] || ERROR_COLOR;

  function closeAlert() {
    setDisplay(!display);
    dismissAlert();
  }

  return (
    <>
      {display ? (
        <Box display="flex" justifyContent="space-between">
          <div className={classes.alert} style={{ backgroundColor: color }}>
            <div className={classes.customMsg}>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                size="2x"
                style={{ marginRight: '10px' }}
              />{' '}
              <span data-testid={messageTestid}>{message}</span>
              <span className={classes.closebtn}>
                <button className={classes.button} type="button" onClick={closeAlert}>
                  &times;
                </button>{' '}
              </span>
            </div>
          </div>
        </Box>
      ) : (
        <div />
      )}
    </>
  );
}

// Alert.propTypes = {
//   message: PropTypes.string.isRequired,
//   alertType: PropTypes.string.isRequired,
//   messageTestid: PropTypes.string,
//   dismissAlert: PropTypes.func.isRequired,
// };

export default Alert;
