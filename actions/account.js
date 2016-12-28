import { push } from 'react-router-redux'
import { packOptionsToFetch, responseHandler } from '../utils';
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


/**
 * 登出
 */
export const LOG_OUT = "LOG_OUT"
export function logOut() {
  return dispatch => {
    localStorage.removeItem('token')
    dispatch(push('/login'))
    dispatch({
      type: LOG_OUT
    });
  }
}

export function logIn(userData) {
  return dispatch => {
    dispatch(logInStart())

    packOptionsToFetch('/user/login', userData)
      .then(responseHandler(dispatch))
      .then(function(data) {
          dispatch(logInSuccess())

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
        },
        function(errorMsg) {
          dispatch(logInError(errorMsg))
        });
  }
}
export function loggedIn() {
  return !!localStorage.getItem('token');
}