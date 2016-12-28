import { packOptionsToFetch, responseHandler } from '../utils';

/**
 * 获取UserList数据
 */
export const FETCH_USERLIST_DATA_REQUEST = "FETCH_USERLIST_DATA_REQUEST"
export const FETCH_USERLIST_DATA_SUCCESS = "FETCH_USERLIST_DATA_SUCCESS"
export const FETCH_USERLIST_DATA_ERROR = "FETCH_USERLIST_DATA_ERROR"

//利用list data预加载数据
export const PROLOADED_USERDETAIL_DATA = "PROLOADED_USERDETAIL_DATA"

export function fetchUserListDataStart() {
  return {
    type: FETCH_USERLIST_DATA_REQUEST
  }
}

export function fetchUserListDataSuccess(data) {
  return {
    type: FETCH_USERLIST_DATA_SUCCESS,
    data: data
  }
}

export function fetchUserListDataError(error) {
  return {
    type: FETCH_USERLIST_DATA_ERROR,
    error
  }
}



export function fetchUserListData(params) {
  return dispatch => {
    dispatch(fetchUserListDataStart())

    packOptionsToFetch('/user/userList', params)
      .then(responseHandler(dispatch))
      .then(function(data) {
          dispatch(fetchUserListDataSuccess(data))
        },
        function(errorMsg) {
          dispatch(fetchUserListDataError(errorMsg))
        });
  }
}

export function proloadedUserDetailData(data) {
  return {
    type: PROLOADED_USERDETAIL_DATA,
    data: data
  }
}

export function exportUserList(params) {
  return dispatch => {
    packOptionsToFetch('/order/exportUserList', params)
      .then(responseHandler(dispatch))
      .then(function(data) {
          window.alert("导出成功");
        },
        function(errorMsg) {
          window.alert("导出失败：" + JSON.stringify(errorMsg));
        }
      );
  }
}