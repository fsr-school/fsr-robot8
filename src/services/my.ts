import Taro from '@tarojs/taro'
import { createCloudApi, createDbApi } from './cloud-api'
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
      },
    }).then(res => {
      console.log(777, ..res);

      resolve(res.result)
    }).catch(e => (){
      console.log(666, ...e);
      reject(...e)
    })
  }, 'login')
}
