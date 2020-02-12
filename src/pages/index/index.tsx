// eslint-disable-next-line no-unused-vars
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  state = {
    openid: 'string'
  }

  componentWillMount () { }

  componentDidMount () {
    if (!Taro.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onGetOpenid () {
    console.log(9999)

    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.setState({openid: res.result.openid})
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
        console.log(8888)

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='index'>
        <View className='at-article__h1'>
          <Text>{this.state.openid}</Text>
        </View>
         <AtButton type='primary' onClick={this.onGetOpenid}>AtButton</AtButton>
         <Button type='primary' onClick={this.onGetOpenid}>Button</Button>
      </View>
    )
  }
}
