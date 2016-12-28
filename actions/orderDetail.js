import { packOptionsToFetch, responseHandler } from '../utils';

/**
 * 获取UserDetail数据
 */
export const FETCH_ORDERDETAIL_DATA_REQUEST = "FETCH_ORDERDETAIL_DATA_REQUEST"
export const FETCH_ORDERDETAIL_DATA_SUCCESS = "FETCH_ORDERDETAIL_DATA_SUCCESS"
export const FETCH_ORDERDETAIL_DATA_ERROR = "FETCH_ORDERDETAIL_DATA_ERROR"
export const FETCH_BUYERDETAIL_DATA = "FETCH_BUYERDETAIL_DATA"
export const FETCH_SELLERDETAIL_DATA = "FETCH_SELLERDETAIL_DATA"

export function fetchOrderDetailDataStart() {
  return {
    type: FETCH_ORDERDETAIL_DATA_REQUEST
  }
}

export function fetchOrderDetailDataSuccess(data) {
  return {
    type: FETCH_ORDERDETAIL_DATA_SUCCESS,
    data: data
  }
}

export function fetchOrderDetailDataError(error) {
  return {
    type: FETCH_ORDERDETAIL_DATA_ERROR,
    error
  }
}

export function fetchOrderDetailData(params) {
  return dispatch => {
    dispatch(fetchOrderDetailDataStart())

    packOptionsToFetch('/order/orderDetail', params)
      .then(responseHandler(dispatch))
      .then(function(data) {
          dispatch(fetchOrderDetailDataSuccess(data))
        },
        function(errorMsg) {
          dispatch(fetchOrderDetailDataError(errorMsg))
        });
  }
}

export function fetchBuyerDetailDataSuccess(data) {
  return {
    type: FETCH_BUYERDETAIL_DATA,
    data: data
  }
}
export function fetchSellerDetailDataSuccess(data) {
  return {
    type: FETCH_SELLERDETAIL_DATA,
    data: data
  }
}

export function fetchUserDetailData(params, role) {
  return dispatch => {
    packOptionsToFetch('/user/userDetail', params)
      .then(responseHandler(dispatch))
      .then(function(data) {
          if (role === 'buyer') {
            dispatch(fetchBuyerDetailDataSuccess(data))
          } else {
            dispatch(fetchSellerDetailDataSuccess(data))
          }
        },
        function(errorMsg) {
          dispatch(fetchOrderDetailDataError(errorMsg))
        });
  }
}