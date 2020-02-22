import Taro, { Component, Config } from '@tarojs/taro'
import dva, { connect } from 'dva';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtGrid, AtNavBar } from "taro-ui"
import './index.scss'


export default class Index extends Component {
  state = {
    openid: 'string'
  }

  componentWillMount() {
  },

  componentDidMount() {
    // TAG 这里临时用于自动跳转 TabBar 页面
    // Taro.switchTab({ url: '../../pages/my/index' })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  gotoPage() {
    Taro.navigateTo({ url: '../webview/index' })
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
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
        <View className='doc-header'>
          <View className='doc-header__title'>title</View>
          <View className='doc-header__desc'>desc</View>
        </View>
        <View className='panel'>
          <View className='panel__title'>NavBar 导航栏</View>
          <View className='panel__content no-padding'>
            <View className='example-item'>
              <AtNavBar
                title='NavBar 导航栏示例'
                leftIconType='chevron-left'
                rightFirstIconType='bullet-list'
                rightSecondIconType='user'
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

