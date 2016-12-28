import { packOptionsToFetch, responseHandler } from '../utils';

/**
 * 获取UserDetail数据
 */
export const FETCH_USERDETAIL_DATA_REQUEST = "FETCH_USERDETAIL_DATA_REQUEST"
export const FETCH_USERDETAIL_DATA_SUCCESS = "FETCH_USERDETAIL_DATA_SUCCESS"
export const FETCH_USERDETAIL_DATA_ERROR = "FETCH_USERDETAIL_DATA_ERROR"

export function fetchUserDetailDataStart() {
  return {
    type: FETCH_USERDETAIL_DATA_REQUEST
  }
}

export function fetchUserDetailDataSuccess(data) {
  return {
    type: FETCH_USERDETAIL_DATA_SUCCESS,
    data: data
  }
}

export function fetchUserDetailDataError(error) {
  return {
    type: FETCH_USERDETAIL_DATA_ERROR,
    error
  }
}

export function fetchUserDetailData(params) {
  return dispatch => {
    dispatch(fetchUserDetailDataStart())

    packOptionsToFetch('/user/userDetail', params)
      .then(responseHandler(dispatch))
      .then(function(data) {
          dispatch(fetchUserDetailDataSuccess(data))
        },
        function(errorMsg) {
          dispatch(fetchUserDetailDataError(errorMsg))
        });
  }
}