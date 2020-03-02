import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCalendar } from 'taro-ui'
import './index.scss'


export default class Index extends Component {

  config: Config = {
    navigationBarTitleText: '恒星 - 课程'
  }

  render() {
    return (
      <View className='index'>
        <AtCalendar />
      </View>
    )
  }
}

