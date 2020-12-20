import {
  SET_PERSON_FORM,
  GET_PEOPLE_SUCCESS,
  SET_EDITING_PERSON,
  GET_PERSON_SUCCESS,
  CHANGE_PAGE,
  CHANGE_ROWS_PER_PAGE,
  RESET_PERSON,
} from '../../constants/actionTypes';
import { api } from '../../helpers/http';
import { makeActionCreator } from '../../helpers/mix';
import { isSuccess } from '../action-utilities';
import { setErrorMessage, setFetchingRequest, setSuccessMessage } from './messaging';

export const setPersonForm = makeActionCreator(SET_PERSON_FORM, 'personForm');
export const setEditingPerson = makeActionCreator(SET_EDITING_PERSON, 'status');
export const getPeopleSuccess = makeActionCreator(GET_PEOPLE_SUCCESS, 'people');
export const getPersonSuccess = makeActionCreator(GET_PERSON_SUCCESS, 'person');
export const changePage = makeActionCreator(CHANGE_PAGE, 'page');
export const changeRowsPerPage = makeActionCreator(CHANGE_ROWS_PER_PAGE, 'rowsPerPage');

export const resetPerson = makeActionCreator(RESET_PERSON);

export function createPerson() {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    const { personForm } = getState().person;
    const { type, name, cpfCnpj, phone, city, uf, birthDate } = personForm;

    const payload = {
      type,
      name,
      cpfCnpj,
      phone,
      city,
      uf,
      birthDate,
    };

    return api
      .post('/create-person', payload)
      .then((res) => {
        if (isSuccess(res)) {
          dispatch(setSuccessMessage('Usuário cadastrado com sucesso!'));
          dispatch(resetPerson());
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function editPerson() {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    const { personForm } = getState().person;
    const { _id, type, name, cpfCnpj, phone, city, uf } = personForm;

    const payload = {
      _id,
      type,
      name,
      cpfCnpj,
      phone,
      city,
      uf,
    };

    return api
      .post('/edit-person', payload)
      .then((res) => {
        if (isSuccess(res)) {
          dispatch(setSuccessMessage('Usuário alterado com sucesso!'));
          dispatch(resetPerson());
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function getPeople() {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    const { page, perPage } = getState().person;

    return api
      .get('/get-people')
      .then((res) => {
        isSuccess(res) ? dispatch(getPeopleSuccess(res.data.data)) : dispatch(setErrorMessage());
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function searchPerson({ cpfCnpj, uf, city }) {
  return (dispatch) => {
    dispatch(setFetchingRequest(true));

    const params = { cpfCnpj, city, uf };

    return api
      .get('/search-person', { params })
      .then((res) => {
        if (isSuccess(res) && res.data.data.length !== 0) {
          dispatch(getPersonSuccess(res.data.data));
        } else {
          console.log('era para mostrar');
          dispatch(setErrorMessage('A pesquisa não retornou resultados'));
        }
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}

export function deletePerson(_id) {
  return (dispatch, getState) => {
    dispatch(setFetchingRequest(true));

    return api
      .delete(`/delete-person/${_id}`)
      .then((res) => {
        isSuccess(res) ? dispatch(getPeople()) : dispatch(setErrorMessage());
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setFetchingRequest(false));
      });
  };
}
