import { push } from 'react-router-redux'
import * as auth from '../auth'

/**
 * 登录
 */

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_ERROR = "LOG_IN_ERROR"

export const FETCH_USER_DATA_SUCCESS = "FETCH_USER_DATA_SUCCESS"

export function logInStart() {
  return {
    type: LOG_IN_REQUEST,
  }
}

export function logInSuccess() {
  return {
    type: LOG_IN_SUCCESS,
  }
}

export function logInError(error) {
  return {
    type: LOG_IN_ERROR,
    error
  }
}

export function saveUserData(userData) {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    userData
  }
}

export function logIn(userData) {
  return dispatch => {
    dispatch(logInStart())

    auth.logIn(userData).then(function(data) {
      dispatch(logInSuccess())

      //token保存在本地
      auth.setLocalStoragePermissions(data.token)

      //保存user数据
      const userData = {
        account: {
          isLogin: true,
          ...data.userInfo
        },
        token: data.token
      }
      localStorage.setItem('token', data.token);

      dispatch(saveUserData(userData))
      dispatch(push('/'))
    }, function(error) {
      window.alert(error);
      dispatch(logInError(error))
    })
  }
}

/**
 * 登出
 */

export const LOG_OUT = "LOG_OUT"

export function logOut() {
  return dispatch => {
    auth.logOut()
    dispatch(push('/login'))
    dispatch({
      type: LOG_OUT
    })
  }
}

/**
 * 初始化登陆状态
 */

//export const INIT_AUTH_STATE = "INIT_AUTH_STATE"
//
//export function initAuthState() {
//    return {type: INIT_AUTH_STATE, authed: auth.loggedIn()}
//}