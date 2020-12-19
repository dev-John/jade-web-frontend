import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProperties = (state) => {
  return {
    error: state.messaging.error,
    success: state.messaging.success,
    info: state.messaging.info,
    alert: state.messaging.alert,
    fetching: state.messaging.fetching,
  };
};

const mapDispatchToProperties = (dispatch) => ({});

export default connect(mapStateToProperties, mapDispatchToProperties)(App);
