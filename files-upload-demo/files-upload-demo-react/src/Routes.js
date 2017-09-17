// src/Routes.js

import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import BookIndex from './Book/Index';
import BookNew from './Book/New';
import BookEdit from './Book/Edit';
import NotFound from './NotFound';

const history = createBrowserHistory();
const Routes = () =>
  <Router history={history}>
    <Switch>
      <Route path="/books/:id/edit" component={BookEdit} />
      <Route path="/books/new" component={BookNew} />
      <Route path="/books/" component={BookIndex} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>;

export default Routes;
