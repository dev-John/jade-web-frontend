import { updateObject } from '../../helpers/mix';
import {
  GET_TABLE_HEAD_SUCCESS,
  SET_PERSON_FORM,
  GET_PEOPLE_SUCCESS,
  SET_EDITING_PERSON,
  GET_PERSON_SUCCESS,
  CHANGE_PAGE,
  CHANGE_ROWS_PER_PAGE,
  RESET_PERSON,
} from '../../constants/actionTypes';

const initialState = {
  tableHead: [],
  page: 0,
  rowsPerPage: 10,
  totalRows: 0,
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
    birthDate: '',
  },
  isEditingPerson: false,
};

const personReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TABLE_HEAD_SUCCESS:
      return updateObject(state, { tableHead: action.tableHead });
    case SET_PERSON_FORM:
      return updateObject(state, { personForm: action.personForm });
    case GET_PEOPLE_SUCCESS:
      return updateObject(state, {
        people: action.data.people,
        totalRows: action.data.totalPeople,
      });
    case GET_PERSON_SUCCESS:
      return updateObject(state, { person: action.person });
    case SET_EDITING_PERSON:
      return updateObject(state, { isEditingPerson: action.status });
    case CHANGE_PAGE:
      return updateObject(state, { page: action.page });
    case CHANGE_ROWS_PER_PAGE:
      return updateObject(state, { rowsPerPage: action.rowsPerPage });
    case RESET_PERSON:
      return updateObject(state, initialState);

    default:
      return state;
  }
};

export default personReducer;
