import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtGrid } from "taro-ui"

import { openWebView } from '@/utils/index'
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

type PageStateProps = {}

type PageDispatchProps = {
  eLogin: () => void
  eGetUserInfo: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ }) => ({

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
}))
class Index extends Component<IProps, PageState> {

  // 组件将要挂载
  componentWillMount() {
    // 登录和获取用户信息，有更新就保存到数据库，仅执行一次
    this.props.eLogin()
    this.props.eGetUserInfo()
  }

  gotoPage() {
    openWebView({ url: 'http://mp.weixin.qq.com/s?__biz=MzU1Njc4MjY3NQ==&mid=100000005&idx=1&sn=6ef25323a8037c3f87ada2f0b7389d99&chksm=7c3e84394b490d2fb57179f0f274cdb7cca0cd68c9d4e9ca8f48c9a9200102d632395d5c5dad&scene=18#wechat_redirect' })
  }

  config: Config = {
    navigationBarTitleText: '恒星 - 发现'
  }

  render() {
    return (
      <View className='index'>
        <Swiper
          className='test-h'
          style='height: 200px;'
          indicatorDots={true}
          indicatorColor='#ddd'
          indicatorActiveColor='#32cc0a'
          vertical={false}
          // circular={true}
          autoplay>
          <SwiperItem>
            {/* <View className='demo-text-2'>2</View> */}
            <Image onClick={() => this.gotoPage()}
              style='width: 100%;height: 200px;background: #fff;'
              src='https://mmbiz.qpic.cn/mmbiz_jpg/K8qibvPW1xfr6uibTjLo6xThAF1l00BToc3IPibH781kDATbW0OGDXNwEJsuGZv9g4QSpj0tC5WEy0JF5ib3KyHEVg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1' />
          </SwiperItem>
          <SwiperItem>
            <Image
              style='width: 100%;height: 200px;background: #fff;'
              src='cloud://fsr-robot8.6673-fsr-robot8-1254200085/oMBkB0TWfwBlqUk-1P6lHi8J-wno/0.02490469532826589_1581241327904.jpg' />
          </SwiperItem>
          <SwiperItem>
            <Image
              style='width: 100%;height: 200px;background: #fff;'
              src={require('../../assets/images/swiper/3.jpg')} />
          </SwiperItem>
        </Swiper>
        <AtGrid data={
          [
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
              value: '领取中心'
            },
            {
              image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
              value: '找折扣'
            },
            {
              image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
              value: '领会员'
            },
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
              value: '新品首发'
            },
            {
              image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
              value: '领京豆'
            },
            {
              image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
              value: '手机馆'
            }
          ]
        } />
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
