import _ from 'lodash';
import * as serverConf from './config'
import { push } from 'react-router-redux';

export function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    return handlers[action.type] ? handlers[action.type](state, action) : state
  }
}

/*
 *包装fetch普通数据请求
 *@param api String [必选] 后端API
 *@param params Object [可选] 请求参数
 *
 *@return Promise Object
 */
export function packOptionsToFetch(api, params, type = 'OPS') {
  return new Promise(function(resolve, reject) {
    try {
      let globalParams = {};
      let options = {};
      let data = [];

      let completeApi = serverConf['SERVER_API_ROOT_' + type] + (serverConf.SERVER_API_PORT ? ':' + serverConf.SERVER_API_PORT : '') + api;

      const token = localStorage.getItem('token');
      globalParams = { token }

      data = _.map(Object.assign({}, params || {}, globalParams), (value, key) => {
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        } else if (typeof value === 'string') {
          value = (value.trim());
        }

        return key + '=' + value;
      });
      let requestParams = data.join('&');

      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        /*
         * 需要发送的数据，可以是 Blob, BufferSource, FormData, URLSearchParams, 或者 USVString。
         * 需要注意的是 GET 和 HEAD 方法不能包含 body。
         */
        body: requestParams,

        /*
         * 允许跨域，但要求响应中包含 Access-Control-Allow-* 这类表示 CORS 的头部信息，
         * 且响应中只有部分头部信息（ Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma）可以读取，但响应内容可以不受限地读取。
         */
        mode: "cors"
      }

      //发送请求 返回promise对象
      resolve(fetch(completeApi, options));
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
            resolve(json.data);
          }
      }
    }));
}