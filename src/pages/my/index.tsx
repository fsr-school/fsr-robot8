import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text, Button } from '@tarojs/components'
import { AtList, AtListItem, AtAccordion, AtAvatar } from "taro-ui"

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
export default class Index extends Component<MyIProps, MyPageState> {
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

  handleClick(value) {
    this.setState({
      openChildren: value
    })
  }

  render() {
    const { scopeUserInfo, avatarUrl, nickName, auth } = this.props.my
    // const { id } = this.$router.params
    console.log(this.props.my);

    return (
      <View className='my'>
        <View className="c-user-info">
          {scopeUserInfo
            ?
            <View className="info">
              <AtAvatar circle image={avatarUrl}></AtAvatar>
              <Text className="username">{nickName}</Text>
            </View>
            :
            <Button openType="getUserInfo" onGetUserInfo={this.onGetUserInfo}>登录</Button>
          }
          <AtAccordion className="children" title='正在管理学生：李晗亮'
            open={this.state.openChildren}
            onClick={this.handleClick.bind(this)}
            icon={{ value: 'user', color: 'red', size: '15' }}>
            <AtList hasBorder={false}>
              <AtListItem
                title='李晗亮'
                arrow='right'
                thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              />
              <AtListItem
                title='郝雅婷'
                note='描述信息'
                arrow='right'
                thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              />
            </AtList>
          </AtAccordion>
        </View>
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
            {
              auth && auth.includes('管理入口') && <AtListItem title='管理' arrow='right'
                iconInfo={{
                  size: 25, color: '#32cc0a', value: 'user'
                }} />
            }
          </AtList>
        </View>
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

