import { connect } from 'react-redux';

import Alert from '../components/Alert';
import { dismissMessage } from '../store/actions/messaging';

const mapStateToProperties = (state) => {
  return {};
};

const mapDispatchToProperties = (dispatch) => ({
  dismissAlert: () => dispatch(dismissMessage()),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(Alert);
