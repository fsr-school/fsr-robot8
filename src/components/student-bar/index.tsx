import Taro, { Component } from '@tarojs/taro'

import { View, Button } from '@tarojs/components'
import { AtAvatar } from "taro-ui"

import './index.scss'

export default class Index extends Component {

  render() {

    return (
      <View className='student-bar at-row at-row__justify--between'>
        <View className='at-col at-col-2'>
          <AtAvatar className='xxx' circle size='small' image='https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIT8YlU9LxIMVTmfAIbTMZYxe2PSOQia0SYflsiatPdpsyKtyuERuPNuibhyAyIvRWNYrSGqbEcSvRcA/132'></AtAvatar>
        </View>
        <View className='at-col at-col-6'>
          <View className="student-bar-title">
            李晗亮<View className='at-icon at-icon-edit'></View>
          </View>
          <View className="student-bar-detail">
            在学 [1阶段{/* /3阶段/车辆主题 */}] 课程
          </View>
        </View>
        <View className='at-col at-col-4'>
          {
            1 ?
              <Button className="student-bar-swap">切换学生</Button>
              :
              <View className='at-icon at-icon-chevron-right'></View>
          }
        </View>

      </View>
    )
  }
}
