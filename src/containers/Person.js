import { connect } from 'react-redux';

import PersonForm from '../components/PersonForm';

import { getUfs, getCitiesByUf } from '../store/actions/location';
import { createPerson, setPersonForm } from '../store/actions/person';

const mapStateToProperties = (state) => {
  const { ufs, cities } = state.location;
  const { isEditingPerson, personForm } = state.person;

  return { ufs, cities, isEditingPerson, personForm };
};

const mapDispatchToProperties = (dispatch) => ({
  getUfs: () => dispatch(getUfs()),
  getCitiesByUf: (uf) => dispatch(getCitiesByUf(uf)),
  createPerson: () => dispatch(createPerson()),
  setPersonForm: (personForm) => dispatch(setPersonForm(personForm)),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(PersonForm);
