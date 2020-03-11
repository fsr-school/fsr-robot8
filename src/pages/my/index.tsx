import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Button } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from "taro-ui"

import { StudentBar, StudentGrid } from "@/components/index";

import './index.scss'


// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  my: {
    _id: string,
    auth: Array<string>,
    nickName: string,
    avatarUrl: string,
    // 是否授权获取用户信息
    scopeUserInfo: boolean,
  }
}

type PageDispatchProps = {
  eLogin: () => void
  eGetUserInfo: () => void
  eSetUserInfo: (payload) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ my }) => ({
  my
}), (dispatch) => ({
  eLogin() {
    dispatch({
      type: 'my/eLogin',
    })
  },
  eGetUserInfo() {
    dispatch({
      type: 'my/eGetUserInfo',
    })
  },
  eSetUserInfo(payload) {
    dispatch({
      type: 'my/eSetUserInfo',
      payload
    })
  },
}))
class Index extends Component<IProps, PageState> {
  state = {
    openChildren: false,
  }

  config: Config = {
    navigationBarTitleText: '恒星 - 我的'
  }

  /**
   * 当登录按钮，授权成功时
   */
  onGetUserInfo(ret) {
    const userInfo = ret.detail.userInfo
    // 授权成功时才有对象
    userInfo && this.props.eSetUserInfo(userInfo)
  }

  render() {
    const { scopeUserInfo, avatarUrl, nickName, auth } = this.props.my
    return (
      <View className='page my'>
        <View className="my-user-info">
          <AtAvatar circle size='large' className='my-avatar' image={avatarUrl}></AtAvatar>
          {
            scopeUserInfo
              ?
              <View className="my-nickname">{nickName}<View className='at-icon at-icon-edit'></View></View>
              :
              <Button className='my-user-login-bt' openType="getUserInfo" onGetUserInfo={this.onGetUserInfo}>登录</Button>
          }
          <StudentBar />
        </View>
        <StudentGrid />
        <View className="my-user-menu">
          <AtList>
            <AtListItem title='通知' arrow='right' extraText='+10'
              iconInfo={{
                size: 25, color: '#ffbf0f', value: 'bell'
              }} />
            <AtListItem title='帮助' arrow='right'
              iconInfo={{
                size: 25, color: '#37B13F', value: 'help',
              }} />
            <AtListItem title='设置' arrow='right'
              iconInfo={{
                size: 25, color: '#78A4FA', value: 'settings'
              }} />
          </AtList>
        </View>
        {
          auth && auth.includes('管理入口') &&
          <View className="my-user-menu">
            <AtList>
              <AtListItem title='管理' arrow='right'
                onClick={() => {
                  Taro.navigateTo({ url: '../admin/index' })
                }}
                iconInfo={{
                  size: 25, color: 'red', value: 'user'
                }} />
            </AtList>
          </View>
        }
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index
