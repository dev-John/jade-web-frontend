import { connect } from 'react-redux';

import Snackbars from '../components/Snackbars';
import { dismissMessage } from '../store/actions/messaging';

const mapStateToProperties = (state) => {
  return {};
};

const mapDispatchToProperties = (dispatch) => ({
  dismissAlert: () => dispatch(dismissMessage()),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(Snackbars);
