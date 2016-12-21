import * as serverConf from './config';
import { packOptions } from './utils';

export function logIn(userData) {
  const api = serverConf.SERVER_API_ROOT + (serverConf.SERVER_API_PORT ? ':' + serverConf.SERVER_API_PORT : '') + '/user/login';

  return fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `username=${userData.username}&password=${userData.password}`
  }).then(function(response) {
    return response.json()
  }).then(function(json) {
    return new Promise(function(resolve, reject) {
      if (json.code === 1) {
        resolve(json.content)
      } else {
        reject(json.msg)
      }
    })
  })
}

export function loggedIn() {
  return !!localStorage.getItem('token');
}

export function logOut() {
  localStorage.removeItem('token')
}