import { showLoadingToast, hideToast } from '@/utils/toast';

import { createCloudApi } from './cloud-api'
import { uploadImage } from './index'

const { cloud } = wx;



/**
 * 创建学生档案
 */
export function createStudent({ avatarUrl, name, sex, birthday, remark }) {
  return createCloudApi((resolve, reject) => {
    // loading
    showLoadingToast({ title: '数据请求中' })
    // 上传图片
    cloud.callFunction({
      name: 'common',
      data: {
        space: 'student',
        name: 'createStudent',
        data: {
          name,
          sex,
          birthday: new Date(birthday),
          remark,
        }
      }
    }).then(res => {
      hideToast()
      const { data } = res.result
      uploadImage({
        type: 'student_avatar',
        filePath: avatarUrl,
        name,
      }).then(res => {
        resolve({ _id: data, avatarUrl: res })
      }).catch(err => {
        hideToast()
        reject(err)
      })
    }).catch(err => {
      hideToast()
      reject(err)
    })
  }, 'student.createStudent')
}
