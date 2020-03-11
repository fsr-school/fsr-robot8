import avatarBg from '@/assets/images/my/avatar-bg.jpg'
import { CLOUD_FILE_URL, CLOUD_FILE_HTTP_URL } from '@/config/index';
import { getGlobalData, setGlobalData } from './global-data'

/**
 * 获取云存储文件路径
 * @param type 云目录分类
 * @param name 文件名称
 * @param ext  文件扩展名，默认为 jpg
 * @param noCache 不允许缓存文件，默认为 true，会使用 https 链接，并追加序号参数，false 则使用 cloud://
 * @param update 是否更新缓存序号，仅在 noCache=true 时有效，默认为 false，true 则缓存序号加 1
 */
function getCloudFileUrl({ type, name, ext = 'jpg', noCache = true, update = false }) {
  let url = CLOUD_FILE_URL
  let t = ''
  if (noCache) {
    url = CLOUD_FILE_HTTP_URL
    let key = 'CLOUD_FILE.' + url
    let v = getGlobalData(key, true)
    !v && setGlobalData(key, v = Date.now(), true)
    update && setGlobalData(key, ++v, true)
    t = '?t=' + v
  }
  return `${url}/${type}/${name}.${ext}${t}`
}


export {
  /**
   * 默认头像背景图片
   */
  avatarBg,
  getCloudFileUrl,
}
