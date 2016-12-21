import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
//loading中间件 触发loading动画的action
import loadingMiddleware from '../middleware/loading'
//错误处理中间件 
import errorMiddleware from '../middleware/error'
import reducer from '../reducers'
import DevTools from '../containers/DevTools'

//A middleware you can apply to your Redux store to capture dispatched actions created by the action creators. It will redirect those actions to the provided history instance.

const reduxRouterMiddleware = routerMiddleware(browserHistory);

// 创建一个 Redux store 来以存放应用中所有的 state。
// 应用中应有且仅有一个 store。
// http://cn.redux.js.org/docs/api/createStore.html
const store = createStore(reducer, {}, compose(
  applyMiddleware(thunk, reduxRouterMiddleware, createLogger(), loadingMiddleware(), errorMiddleware()), DevTools.instrument()));

// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(require('../reducers') /*.default if you use Babel 6+ */ )
  );
}

export default store