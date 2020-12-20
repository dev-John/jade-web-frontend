import { connect } from 'react-redux';

import PhoneSearch from '../components/PhoneSearch';
import { getTableHead, searchPerson } from '../store/actions/person';
import { getUfs, getCitiesByUf } from '../store/actions/location';

const mapStateToProperties = (state) => {
  const { ufs, cities } = state.location;
  const { tableHead, person } = state.person;

  return { tableHead, ufs, cities, person };
};

const mapDispatchToProperties = (dispatch) => ({
  getTableHead: () => dispatch(getTableHead()),
  searchPerson: ({ cpfCnpj, uf, city }) => dispatch(searchPerson({ cpfCnpj, uf, city })),
  getUfs: () => dispatch(getUfs()),
  getCitiesByUf: (uf) => dispatch(getCitiesByUf(uf)),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(PhoneSearch);
