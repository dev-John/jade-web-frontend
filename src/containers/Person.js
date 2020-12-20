import { connect } from 'react-redux';

import PersonForm from '../components/PersonForm';

import { getUfs, getCitiesByUf } from '../store/actions/location';
import { createPerson, editPerson, setPersonForm } from '../store/actions/person';
import { setErrorMessage } from '../store/actions/messaging';

const mapStateToProperties = (state) => {
  const { ufs, cities } = state.location;
  const { isEditingPerson, personForm } = state.person;

  return { ufs, cities, isEditingPerson, personForm };
};

const mapDispatchToProperties = (dispatch) => ({
  getUfs: () => dispatch(getUfs()),
  getCitiesByUf: (uf) => dispatch(getCitiesByUf(uf)),
  createPerson: () => dispatch(createPerson()),
  editPerson: () => dispatch(editPerson()),
  setPersonForm: (personForm) => dispatch(setPersonForm(personForm)),
  setErrorMessage: (error) => dispatch(setErrorMessage(error)),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(PersonForm);
