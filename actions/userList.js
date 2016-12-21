import { packOptions, responseHandler } from '../utils';

/**
 * 获取UserList数据
 */
export const FETCH_USERLIST_DATA_REQUEST = "FETCH_USERLIST_DATA_REQUEST"
export const FETCH_USERLIST_DATA_SUCCESS = "FETCH_USERLIST_DATA_SUCCESS"
export const FETCH_USERLIST_DATA_ERROR = "FETCH_USERLIST_DATA_ERROR"

export function fetchUserListDataStart() {
  return {
    type: FETCH_USERLIST_DATA_REQUEST
  }
}

export function fetchUserListDataSuccess(data) {
  console.log(data.userList);

  return {
    type: FETCH_USERLIST_DATA_SUCCESS,
    userList: data.userList
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

    packOptions('/user/userList', params)
      .then((api, options) => fetch(api, options))
      .then(responseHandler(dispatch))
      .then(function(data) {
          dispatch(fetchUserListDataSuccess(data))
        },
        function(errorMsg) {
          dispatch(fetchUserListDataError(errorMsg))
        });
  }
}