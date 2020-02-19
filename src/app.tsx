import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import dva from './dva'
import models from './models/index'

import WeCloudApi from '@/services/wx-cloud-api'
import WeApi from '@/services/wx-api'
import Index from './pages/index'
import './app.scss'

WeApi.init()
WeCloudApi.init()


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


const dvaApp = dva.createApp({
  initialState: {},
  models
})
const store = dvaApp.getStore()


class App extends Component {

  // 构造函数将会在装配之前被调用
  /* constructor (props) {
    super(props)
  } */
  componentWillMount() {
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/timetable/index',
      'pages/my/index',
      'pages/webview/index',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#37B13F',
      navigationBarTitleText: '恒星机器人',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#000',
      selectedColor: '#37B13F',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [
        {
          text: '发现',
          pagePath: 'pages/index/index',
          iconPath: 'assets/images/icon-tabbar/discover.png', // #7A7E83
          selectedIconPath: 'assets/images/icon-tabbar/discoverfill.png', // #37B13F
        },
        {
          text: '课表',
          pagePath: 'pages/timetable/index',
          iconPath: 'assets/images/icon-tabbar/form.png',
          selectedIconPath: 'assets/images/icon-tabbar/formfill.png',
        },
        {
          text: '我的',
          pagePath: 'pages/my/index',
          iconPath: 'assets/images/icon-tabbar/my.png',
          selectedIconPath: 'assets/images/icon-tabbar/myfill.png',
        }
      ]
    },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'))
