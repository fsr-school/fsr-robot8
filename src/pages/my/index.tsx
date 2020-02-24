import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CUserInfo from './c-user-info'
import { AtList, AtListItem } from "taro-ui"

import './index.scss'



type PageDispatchProps = {
  asyncLogin: () => void
}


@connect(({ my }) => ({
  my
}), (dispatch) => ({
  asyncLogin() {
    dispatch({
      type: 'my/asyncLogin',
    })
  },
}))
export default class Index extends Component {
  state = {}

  componentWillMount() {
    this.props.asyncLogin()
    this.props.asyncLogin()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '恒星 - 我的'
  }

  render() {
    const { _id, auth } = this.props
    console.log(3333, ...this.props);

    return (
      <View className='my'>
        <Text>{_id} {auth} dsfsafdsafsaf</Text>
        <CUserInfo />
        <View>
          <AtList>
            <AtListItem title='积分' extraText='125' arrow='right'
              iconInfo={{
                size: 25, color: '#32cc0a', value: 'sketch',
              }} />
            <AtListItem title='相册' extraText='+10' arrow='right'
              iconInfo={{
                size: 25, color: '#78A4FA', value: 'image',
              }} />
            <AtListItem title='留言' extraText='+3' arrow='right'
              iconInfo={{
                size: 25, color: '#ee9900', value: 'message',
              }} />
          </AtList>
        </View>
        <View>
          <AtList>
            <AtListItem title='设置' arrow='right'
              iconInfo={{
                size: 25, color: '#78A4FA', value: 'settings'
              }} />
            <AtListItem title='管理' arrow='right'
              iconInfo={{
                size: 25, color: '#32cc0a', value: 'user'
              }} />
            <AtListItem title='超级管理' arrow='right'
              iconInfo={{
                size: 25, color: '#FF4949', value: 'user'
              }} />
          </AtList>
        </View>
      </View>
    )
  }
}


