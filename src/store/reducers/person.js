import { updateObject } from '../../helpers/mix';
import {
  SET_PERSON_FORM,
  GET_PEOPLE_SUCCESS,
  SET_EDITING_PERSON,
  GET_PERSON_SUCCESS,
} from '../../constants/actionTypes';

const initialState = {
  people: [],
  person: [],
  personForm: {
    _id: '',
    type: '',
    name: '',
    cpfCnpj: '',
    phone: '',
    uf: '',
    city: '',
  },
  isEditingPerson: false,
};

const personReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PERSON_FORM:
      return updateObject(state, { personForm: action.personForm });
    case GET_PEOPLE_SUCCESS:
      return updateObject(state, { people: action.people });
    case GET_PERSON_SUCCESS:
      return updateObject(state, { person: action.person });
    case SET_EDITING_PERSON:
      return updateObject(state, { isEditingPerson: action.status });

    default:
      return state;
  }
};

export default personReducer;
