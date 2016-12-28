import { packOptionsToFetch, responseHandler } from '../utils';

/**
 * 获取UserList数据
 */
export const FETCH_ORDERLIST_DATA_REQUEST = "FETCH_ORDERLIST_DATA_REQUEST"
export const FETCH_ORDERLIST_DATA_SUCCESS = "FETCH_ORDERLIST_DATA_SUCCESS"
export const FETCH_ORDERLIST_DATA_ERROR = "FETCH_ORDERLIST_DATA_ERROR"

export function fetchOrderListDataStart() {
  return {
    type: FETCH_ORDERLIST_DATA_REQUEST
  }
}

export function fetchOrderListDataSuccess(data) {
  return {
    type: FETCH_ORDERLIST_DATA_SUCCESS,
    data: data
  }
}

export function fetchOrderListDataError(error) {
  return {
    type: FETCH_ORDERLIST_DATA_ERROR,
    error
  }
}


export function fetchOrderListData(params) {
  return dispatch => {
    dispatch(fetchOrderListDataStart())

    packOptionsToFetch('/order/orderList', params)
      .then(responseHandler(dispatch))
      .then(function(data) {
          dispatch(fetchOrderListDataSuccess(data))
        },
        function(errorMsg) {
          dispatch(fetchOrderListDataError(errorMsg))
        }
      );
  }
}

//导出结果集
export function exportOrderList(params) {
  return dispatch => {
    packOptionsToFetch('/order/exportOrderList', params)
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