import Taro, { Component, Config } from '@tarojs/taro'
import dva, { connect } from 'dva';
import { WebView } from '@tarojs/components'
import './index.scss'


export default class Index extends Component {
  state = {}

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '恒星 - xx'
  }

  render() {
    return (
      <View className='index'>
        <WebView src='http://mp.weixin.qq.com/s?__biz=MzU1Njc4MjY3NQ==&mid=100000005&idx=1&sn=6ef25323a8037c3f87ada2f0b7389d99&chksm=7c3e84394b490d2fb57179f0f274cdb7cca0cd68c9d4e9ca8f48c9a9200102d632395d5c5dad&scene=18#wechat_redirect'></WebView>
        {/* <WebView src='http://mp.weixin.qq.com/s?__biz=MzU1Njc4MjY3NQ==&mid=2247485288&idx=1&sn=e047bed7446ed6208c79f50ed65035df&chksm=fc3e8254cb490b424a54830fc2c27be78aba84b5e782232fcdff83cf0fb8ff2c5f91dd11230f&token=874958968&lang=zh_CN#rd'></WebView> */}
      </View>
    )
  }
}

