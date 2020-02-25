import { createCloudApi } from './cloud-api'
const { cloud } = wx;




/**
 * 登录，自动执行一次，新用户自动注册
 */
export function login() {
  return createCloudApi((resolve, reject) => {
    cloud.callFunction({
      name: 'user',
      data: {
        name: 'login'
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  }, 'my.login')
}
