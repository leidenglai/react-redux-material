import React from 'react'

import { render } from 'react-dom' //dom插件

import { browserHistory } from 'react-router' //路由插件

import { syncHistoryWithStore } from 'react-router-redux' //路由结合redux的插件

import store from './store' //redux的store配置 
import Root from './containers/Root'
import * as auth from './auth'

import { initLeanCloud } from './utils'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('./static/styles/bootstrap.css')

if (auth.loggedIn()) {
  initLeanCloud()
}

const history = syncHistoryWithStore(browserHistory, store)
const App = () => (
  <MuiThemeProvider>
    <Root store={store} history={history}/>
  </MuiThemeProvider>
);
render(
  <App />,
  document.getElementById('react-container')
)