import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers } from 'redux';

import messaging from './reducers/messaging';

import location from './reducers/location';
import person from './reducers/person';

export default createStore(
  combineReducers({
    messaging,
    location,
    person,
  }),
  applyMiddleware(thunkMiddleware)
);
