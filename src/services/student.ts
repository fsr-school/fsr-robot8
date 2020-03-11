import { showLoadingToast, hideToast } from '@/utils/toast';

import { createCloudApi } from './cloud-api'

const { cloud } = wx;



/**
 * 创建学生档案
 */
export function createStudent({ name, sex, birthday, remark }) {
  return createCloudApi((resolve, reject) => {
    // loading
    showLoadingToast({ title: '数据请求中' })
    // 创建学生档案
    cloud.callFunction({
      name: 'common',
      data: {
        space: 'student',
        name: 'createStudent',
        data: {
          name,
          sex,
          birthday,
          remark,
        }
      }
    }).then((res: CloudAPI.FunctionResult) => {
      hideToast()
      const { data } = res.result
      resolve({ _id: data })
    }).catch(err => {
      hideToast()
      reject(err)
    })
  }, 'student.createStudent')
}


/**
 * 保存学生档案
 */
export function setStudent({ _id, name, sex, birthday, remark }) {
  return createCloudApi((resolve, reject) => {
    // loading
    showLoadingToast({ title: '数据请求中' })
    // 创建学生档案
    cloud.callFunction({
      name: 'common',
      data: {
        space: 'student',
        name: 'setStudent',
        data: {
          _id,
          name,
          sex,
          birthday,
          remark,
        }
      }
    }).then(() => {
      hideToast()
      resolve()
    }).catch(err => {
      hideToast()
      reject(err)
    })
  }, 'student.setStudent')
}


/**
 * 获取学生档案
 */
export function getStudent({ _id }) {
  return createCloudApi((resolve, reject) => {
    // 创建学生档案
    cloud.callFunction({
      name: 'common',
      data: {
        space: 'student',
        name: 'getStudent',
        data: {
          _id,
        }
      }
    }).then((res: CloudAPI.FunctionResult) => {
      const { data } = res.result
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  }, 'student.getStudent')
}

/**
 * 获取学生档案列表
 */
export function getStudentList() {
  return createCloudApi((resolve, reject) => {
    cloud.callFunction({
      name: 'common',
      data: {
        space: 'student',
        name: 'getStudentList',
        data: {
        }
      }
    }).then((res: CloudAPI.FunctionResult) => {
      const { data } = res.result
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  }, 'student.getStudentList')
}
