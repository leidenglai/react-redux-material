import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import loadingMiddleware from '../middleware/loading'
import reducer from '../reducers'

const reduxRouterMiddleware = routerMiddleware(browserHistory)
const store = createStore(reducer, {}, applyMiddleware(thunk, reduxRouterMiddleware, loadingMiddleware()));

export default store