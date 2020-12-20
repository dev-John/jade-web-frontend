import { connect } from 'react-redux';

import PeopleManagement from '../components/PeopleManagement';

import {
  getTableHead,
  getPeople,
  deletePerson,
  setPersonForm,
  setEditingPerson,
  changePage,
  changeRowsPerPage,
  resetPerson,
} from '../store/actions/person';

const mapStateToProperties = (state) => {
  const { tableHead, people, page, rowsPerPage, totalRows } = state.person;

  return { tableHead, people, page, rowsPerPage, totalRows };
};

const mapDispatchToProperties = (dispatch) => ({
  getTableHead: () => dispatch(getTableHead()),
  getPeople: () => dispatch(getPeople()),
  deletePerson: (_id) => dispatch(deletePerson(_id)),
  setPersonForm: (personForm) => dispatch(setPersonForm(personForm)),
  setEditingPerson: (status) => dispatch(setEditingPerson(status)),
  changePage: (page) => dispatch(changePage(page)),
  changeRowsPerPage: (rowsPerPage) => dispatch(changeRowsPerPage(rowsPerPage)),
  resetPerson: () => dispatch(resetPerson()),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(PeopleManagement);
