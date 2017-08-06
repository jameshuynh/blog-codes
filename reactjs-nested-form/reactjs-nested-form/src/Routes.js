import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import IndexProject from './IndexProject';
import NewProject from './NewProject';
import EditProject from './EditProject';
// import NotFound from './NotFound';

const history = createBrowserHistory();
const Routes = () =>
  <Router history={history}>
    <Switch>
      <Route path="/projects/:id/edit" component={EditProject} />
      <Route path="/projects/new" component={NewProject} />
      <Route path="/projects/" component={IndexProject} />
      <Route path="/" component={IndexProject} />
    </Switch>
  </Router>;

export default Routes;
