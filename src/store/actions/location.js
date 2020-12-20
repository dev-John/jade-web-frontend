import { api } from '../../helpers/http';
import { isSuccess } from '../action-utilities';
import { GET_UFS_SUCCESS, GET_CITIES_SUCCESS } from '../../constants/actionTypes';

import { setErrorMessage, setFetchingRequest, setSuccessMessage } from './messaging';
import { makeActionCreator } from '../../helpers/mix';

export const getUfsSuccess = makeActionCreator(GET_UFS_SUCCESS, 'ufs');
export const getCitiesSuccess = makeActionCreator(GET_CITIES_SUCCESS, 'cities');

export function getUfs() {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    return api
      .get('/get-ufs')
      .then((res) => {
        isSuccess(res) ? dispatch(getUfsSuccess(res.data.data)) : dispatch(setErrorMessage());
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function getCitiesByUf(uf) {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    return api
      .get(`/get-cities-uf/${uf}`)
      .then((res) => {
        isSuccess(res) ? dispatch(getCitiesSuccess(res.data.data)) : dispatch(setErrorMessage());
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}
