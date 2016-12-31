import { packOptionsToFetch, responseHandler } from '../utils';
import { browserHistory } from 'react-router'

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

//改变menu选中
export const SET_MENU_DEFAULT_VALUE = "SET_MENU_DEFAULT_VALUE"

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


//改变menu选中
export function setMneuDefaultValue(name) {
  return {
    type: SET_MENU_DEFAULT_VALUE,
    moduleName: name
  }
}
//页面跳转
export function changeModule(params) {
  return dispatch => {
    const _paramArr = params.split('/');
    const pathName = _paramArr[_paramArr.length - 1].split('?')[0];
    // 跳转
    browserHistory.push(params);
    // 改变menu选择栏目
    dispatch(setMneuDefaultValue(pathName));

  }
}