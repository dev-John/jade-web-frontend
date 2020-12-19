import { connect } from 'react-redux';

import PersonForm from '../components/PersonForm';

const mapStateToProperties = (state) => {
  return {};
};

const mapDispatchToProperties = (dispatch) => ({});

export default connect(mapStateToProperties, mapDispatchToProperties)(PersonForm);
