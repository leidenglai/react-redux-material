// loading动画
export const SHOW_LOADING = "SHOW_LOADING"
export const HIDE_LOADING = "HIDE_LOADING"
  //全局数据
export const GLOBAL_GET = "GLOBAL_GET"
export const GLOBAL_SET = "GLOBAL_SET"
  //消息提示
export const SNACKBAR_MESSAGE_SHOW = "SNACKBAR_MESSAGE_SHOW"
export const SNACKBAR_MESSAGE_HIDE = "SNACKBAR_MESSAGE_HIDE"

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


export function getGlobalProps() {
  let promise = new Promise(function(resolve, reject) {

    try {
      const timeRange = localStorage.getItem('timeRange') || 168;
      const business = localStorage.getItem('business') || 'all';
      const platform = localStorage.getItem('platform') || 'PC';
      resolve({ timeRange, business, platform })
    } catch (err) {
      reject(err);
    }

  });
  return dispatch => {
    return promise.then(params => dispatch(getGlobal(params)))
  };
}

export function setGlobalProps(key, value) {
  let param = {};
  let promise = new Promise(function(resolve, reject) {

    try {
      localStorage.setItem(key, value);
      param[key] = value;
      resolve(param);
    } catch (err) {
      reject(err);
    }

  });

  return dispatch => {
    return promise.then(params => dispatch(setGlobal(params)))
  };
}