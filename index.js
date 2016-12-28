import React from 'react'

import ReactDOM from 'react-dom' //dom插件

import { browserHistory } from 'react-router' //路由插件

import { syncHistoryWithStore } from 'react-router-redux' //路由结合redux的插件


import store from './store' //redux的store配置 
import Root from './containers/Root'
import { loggedIn } from './actions/account'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import commonCss from './static/styles/common.less';
import bootstrapCss from './static/styles/bootstrap.css';
import normalizeCss from 'normalize.css';
const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
  },
});
if (loggedIn()) {}

const history = syncHistoryWithStore(browserHistory, store)
const App = () => (
  <MuiThemeProvider  muiTheme={muiTheme}>
    <Root store={store} history={history}/>
  </MuiThemeProvider>
);
ReactDOM.render(
  <App />,
  document.getElementById('react-container')
)