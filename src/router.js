import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import Routes from './routerConfig'

function RouterConfig({ history }) {
  return (
      <Router history={history}>
          <Switch>
                {Routes.map((route, idx) => (
                    <Route key={idx} {...route} component={() => <route.component />} />
                ))}
          </Switch>
    </Router>
  );
}

export default RouterConfig