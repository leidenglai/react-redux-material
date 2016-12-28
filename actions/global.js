import { packOptionsToFetch, responseHandler } from '../utils';

// loading动画
export const SHOW_LOADING = "SHOW_LOADING"
export const HIDE_LOADING = "HIDE_LOADING"

//全局数据
export const GLOBAL_GET = "GLOBAL_GET"
export const GLOBAL_SET = "GLOBAL_SET"

//消息提示
export const SNACKBAR_MESSAGE_SHOW = "SNACKBAR_MESSAGE_SHOW"
export const SNACKBAR_MESSAGE_HIDE = "SNACKBAR_MESSAGE_HIDE"

// 国家列表
export const FETCH_COUNTRYLIST_DATA = "FETCH_COUNTRYLIST_DATA"

//下拉框列表
export const FETCH_SELECOPTIONTLIST_DATA = "FETCH_SELECOPTIONTLIST_DATA"

export function nprogressStart() {
  return {
    type: SHOW_LOADING
  }
}

export function nprogressDone() {
  return {
    type: HIDE_LOADING
  }
}

//显示全局的消息提示
export function messageSnackbar(content) {
  return {
    type: SNACKBAR_MESSAGE_SHOW,
    content
  }
}
//清除全局的消息提示
export function clearMessageSnackbar() {
  return {
    type: SNACKBAR_MESSAGE_HIDE
  }
}


function getGlobal(params) {
  return {
    type: GLOBAL_GET,
    global: params
  };
}

function setGlobal(params) {
  return {
    type: GLOBAL_SET,
    global: params
  }
}

export function fetchCountryListData() {
  return dispatch => {
    packOptionsToFetch('/user/getAllAddressCountry', {}, 'APP')
      .then(responseHandler(dispatch))
      .then(data => dispatch({
        type: FETCH_COUNTRYLIST_DATA,
        data
      }));
  }
}

//请求下拉框的列表
export function fetchSelectOptionListData(params) {
  return dispatch => {
    packOptionsToFetch('/info/getSelectOptions', params)
      .then(responseHandler(dispatch))
      .then(data => dispatch({
        type: FETCH_SELECOPTIONTLIST_DATA,
        data: data
      }));
  }
}