import { connect } from 'react-redux';

import PeopleManagement from '../components/PeopleManagement';

import { getPeople, deletePerson, setPersonForm, setEditingPerson } from '../store/actions/person';

const mapStateToProperties = (state) => {
  const { people } = state.person;

  return { people };
};

const mapDispatchToProperties = (dispatch) => ({
  getPeople: () => dispatch(getPeople()),
  deletePerson: (_id) => dispatch(deletePerson(_id)),
  setPersonForm: (personForm) => dispatch(setPersonForm(personForm)),
  setEditingPerson: (status) => dispatch(setEditingPerson(status)),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(PeopleManagement);
