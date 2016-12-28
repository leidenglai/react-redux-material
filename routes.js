import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import App from './containers/App'
import AuthPage from './containers/AuthPage'
import UserListPage from './containers/UserListPage'
import UserDetailPage from './containers/UserDetailPage'
import OrderListPage from './containers/OrderListPage'
import OrderDetailPage from './containers/OrderDetailPage'

import { loggedIn } from './actions/account'

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace('/login')
  }
}

export default (
  <Router>
		<Route path="/" component={App}>
	      <IndexRedirect to="/userList"/>
	      <Route path="userList" component={UserListPage} onEnter={requireAuth}/>
	      <Route path="userDetail" component={UserDetailPage} onEnter={requireAuth}/>
	      <Route path="orderList" component={OrderListPage} onEnter={requireAuth}/>
	      <Route path="orderDetail" component={OrderDetailPage} onEnter={requireAuth}/>
	  </Route>
		<Route path="/login" component={AuthPage} />
	</Router>)