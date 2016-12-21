import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import App from './containers/App'
import AuthPage from './containers/AuthPage'
import UserListPage from './containers/UserListPage'

import * as auth from './auth'

function requireAuth(nextState, replace) {
  // if (!auth.loggedIn()) {
  // 	replace('/auth')
  // }
}

export default (
  <Router>
		<Route path="/" component={App}>
	      <IndexRedirect to="/userList"/>
	      <Route path="userList" component={UserListPage} onEnter={requireAuth}/>
	  </Route>
		<Route path="/login" component={AuthPage} />
	</Router>)