import { updateObject } from '../../helpers/mix';
import { GET_UFS_SUCCESS, GET_CITIES_SUCCESS } from '../../constants/actionTypes';

const initialState = {
  ufs: [],
  cities: [],
};

const locationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_UFS_SUCCESS:
      return updateObject(state, { ufs: action.ufs });
    case GET_CITIES_SUCCESS:
      return updateObject(state, { cities: action.cities });

    default:
      return state;
  }
};

export default locationReducer;
