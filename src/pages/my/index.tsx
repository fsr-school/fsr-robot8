import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CUserInfo from './c-user-info'
import { AtList, AtListItem } from "taro-ui"

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
    auth: Array<string>
  }
}

type PageDispatchProps = {
  asyncLogin: () => void
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
  asyncLogin() {
    dispatch({
      type: 'my/asyncLogin',
    })
  },
}))
class Index extends Component<IProps, PageState> {

  componentWillMount() {
    this.props.asyncLogin()
  }

  config: Config = {
    navigationBarTitleText: '恒星 - 我的'
  }

  render() {
    const { auth } = this.props.my
    const { id } = this.$router.params
    return (
      <View className='my'>
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
            <AtListItem title={'留言' + id} extraText='+3' arrow='right'
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
              auth && auth.includes('admin') && <AtListItem title='管理' arrow='right'
                iconInfo={{
                  size: 25, color: '#32cc0a', value: 'user'
                }} />
            }
            {
              auth && auth.includes('super') &&
              <AtListItem title='超级管理' arrow='right'
                iconInfo={{
                  size: 25, color: '#FF4949', value: 'user'
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

export default Index
