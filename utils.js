import * as serverConf from './config'
import { push } from 'react-router-redux';

export function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    return handlers[action.type] ? handlers[action.type](state, action) : state
  }
}

/*
 *包装fetch请求
 *@param api String [必选] 后端API
 *@param params Object [可选] 请求参数
 *
 *@return Promise Object
 */

export function packOptions(api, params) {
  return new Promise(function(resolve, reject) {
    try {
      let globalParams = {};
      let options = {};
      let completeApi = serverConf.SERVER_API_ROOT + (serverConf.SERVER_API_PORT ? ':' + serverConf.SERVER_API_PORT : '') + api;

      const token = localStorage.getItem('token');

      globalParams = { token };

      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.assign({}, params || {}, globalParams))
      };
      resolve(completeApi, options);
    } catch (err) {
      reject(err);
    }

  });
};

/*
 *处理返回值
 *@param response Object [必选] 后端返回的response对象
 *
 *@return Promise Object json处理后的数据
 */
export function responseHandler(dispatch) {
  return response => response.json()
    .then(json => new Promise(function(resolve, reject) {
      switch (response.status) {
        case 401:
          alert('Token Error!');
          dispatch(push('/login'));
          break;
        default:
          if (json.code != 1) {
            reject(json.msg)
          } else {
            resolve(json.content);
          }
      }
    }));
}