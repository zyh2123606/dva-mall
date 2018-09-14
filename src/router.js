import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import Routes from './routerConfig'
import initReactFastclick from 'react-fastclick'
initReactFastclick()

function RouterConfig({ history }) {
  return (
      <Router history={history}>
          <Switch>
                {Routes.map((route, idx) => (
                    <Route key={idx} {...route} />
                ))}
          </Switch>
    </Router>
  );
}

export default RouterConfig