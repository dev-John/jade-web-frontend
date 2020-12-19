import { connect } from 'react-redux';

import PeopleManagement from '../components/PeopleManagement';

const mapStateToProperties = (state) => {
  return {};
};

const mapDispatchToProperties = (dispatch) => ({});

export default connect(mapStateToProperties, mapDispatchToProperties)(PeopleManagement);
