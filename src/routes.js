import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PeopleManagement from './containers/PeopleManagement';
import PersonForm from './containers/Person';
import PhoneSearch from './containers/PhoneSearch';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PhoneSearch} />
        <Route path="/handle-person" component={PersonForm} />
        <Route path="/people-management" component={PeopleManagement} />
      </Switch>
    </BrowserRouter>
  );
}
