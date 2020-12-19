import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PeopleManagement from './containers/PeopleManagement';
import PersonForm from './containers/Person';
import InitialPage from './pages/InitialPage';
import PhoneSearch from './containers/PhoneSearch';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={InitialPage} />
        <Route path="/handle-person" component={PersonForm} />
        <Route path="/people-management" component={PeopleManagement} />
        <Route path="/phone-search" component={PhoneSearch} />
      </Switch>
    </BrowserRouter>
  );
}
