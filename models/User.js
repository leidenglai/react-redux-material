import * as serverConf from '../constants/serverConfig';

/**
 * Class Methods
 */
class User {
  fetchUserList = () => {
    let promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject('test 1111')
      }, 2000)
    })

    return promise;


    // const api = serverConf.SERVER_API_ROOT + (serverConf.SERVER_API_PORT ? ':' + serverConf.SERVER_API_PORT : '') + '/user/list';

    // return fetch(api, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: `username=${userData.username}&password=${userData.password}`
    // }).then(function(response) {
    //   return response.json()
    // }).then(function(json) {
    //   return new Promise(function(resolve, reject) {
    //     if (json.code === 1) {
    //       resolve(json.content)
    //     } else {
    //       reject(json.msg)
    //     }
    //   })
    // })
  }
}

export default User