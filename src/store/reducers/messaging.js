import { updateObject } from '../../helpers/mix';
import {
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  SET_INFO_MESSAGE,
  SET_ALERT_MESSAGE,
  SET_FETCHING_REQUEST,
  DISMISS_MESSAGE,
} from '../../constants/actionTypes';

const DEFAULT_ERROR_MSG = 'Ocorreu um erro, por favor tente novamente';

const initialState = {
  error: null,
  success: null,
  info: null,
  alert: null,

  fetching: false,
};

const messagingReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return updateObject(state, { error: action.error || DEFAULT_ERROR_MSG });
    case SET_SUCCESS_MESSAGE:
      return updateObject(state, { success: action.success });
    case SET_INFO_MESSAGE:
      return updateObject(state, { info: action.info });
    case SET_ALERT_MESSAGE:
      return updateObject(state, { alert: action.alert });
    case SET_FETCHING_REQUEST:
      return updateObject(state, { fetching: action.status });
    case DISMISS_MESSAGE:
      return updateObject(state, { error: null, success: null });

    default:
      return state;
  }
};

export default messagingReducer;
