import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import './index.scss'


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

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '恒星 - 绑定学生档案',
      path: '/pages/my/index?id=123'
    }
  }
  // 组件将要挂载
  componentWillMount() {
    // 登录和获取用户信息，有更新就保存到数据库，仅执行一次
    this.props.eLogin()
    this.props.eGetUserInfo()
  }
  // 组件已显示
  componentDidMount() {
    Taro.getClipboardData({
      success: function (res) {
        console.log(res.data)
      }
    })
    // TAG 这里临时用于自动跳转 TabBar 页面
    // Taro.switchTab({ url: '../../pages/my/index' })
  }

  gotoPage() {
    Taro.navigateTo({ url: '../webview/index' })
  }

  config: Config = {
    navigationBarTitleText: '恒星 - 发现'
  }

  render() {
    console.log(3333, this.props.my);
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

