import {
  DISMISS_MESSAGE,
  SET_ERROR_MESSAGE,
  SET_INFO_MESSAGE,
  SET_ALERT_MESSAGE,
  SET_SUCCESS_MESSAGE,
  SET_FETCHING_REQUEST,
} from '../../constants/actionTypes';
import { makeActionCreator } from '../../helpers/mix';

export const setErrorMessage = makeActionCreator(SET_ERROR_MESSAGE, 'error');
export const setSuccessMessage = makeActionCreator(SET_SUCCESS_MESSAGE, 'success');
export const setInfoMessage = makeActionCreator(SET_INFO_MESSAGE, 'info');
export const setAlertMessage = makeActionCreator(SET_ALERT_MESSAGE, 'alert');
export const setFetchingRequest = makeActionCreator(SET_FETCHING_REQUEST, 'status');
export const dismissMessage = makeActionCreator(DISMISS_MESSAGE);
