import { connect } from 'react-redux';

import PeopleManagement from '../components/PeopleManagement';

import {
  getPeople,
  deletePerson,
  setPersonForm,
  setEditingPerson,
  changePage,
  changeRowsPerPage,
} from '../store/actions/person';

const mapStateToProperties = (state) => {
  const { people, page, rowsPerPage } = state.person;

  return { people, page, rowsPerPage };
};

const mapDispatchToProperties = (dispatch) => ({
  getPeople: () => dispatch(getPeople()),
  deletePerson: (_id) => dispatch(deletePerson(_id)),
  setPersonForm: (personForm) => dispatch(setPersonForm(personForm)),
  setEditingPerson: (status) => dispatch(setEditingPerson(status)),
  changePage: (page) => dispatch(changePage(page)),
  changeRowsPerPage: (rowsPerPage) => dispatch(changeRowsPerPage(rowsPerPage)),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(PeopleManagement);
