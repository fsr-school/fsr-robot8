import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import dva from './dva'
import models from './models/index'

import { init } from '@/services/index'
import Index from './pages/index'

import './app.scss'


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// 初始化数据接口
init()

// dva初始化
const dvaApp = dva.createApp({
  initialState: {},
  models
})
const store = dvaApp.getStore()


class App extends Component {
  // @ts-ignore 配置默认参数
  // private static defaultProps = {}

  // 注意：Taro组件的 constructor 与 render 默认会多调用一次

  // 构造函数将会在装配之前被调用
  /* constructor (props) {
    super(props)
  } */

  // // 组件将要挂载
  // componentWillMount() { }
  // // 组件已挂载
  // componentDidMount() { }
  // // 组件已显示
  // componentDidShow() { }
  // // 组件将要接收参数
  // componentWillReceiveProps(nextProps) { }
  // // 组件已隐藏
  // componentDidHide() { }
  // // 组件已捕获错误
  // componentDidCatchError() { }
  // // 组件已完成更新显示
  // componentDidUpdate() { }
  // // 组件已卸载
  // componentWillUnmount() { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    // 配置使用页面，第1个为显示第1页
    pages: [
      // 首页
      'pages/index/index',
      // 课程表
      'pages/timetable/index',
      // 我的
      'pages/my/index',
      // 打开的外部链接 ?url=encodeURIComponent(url) 需转码，请使用 openWebView() @ utils/index
      'pages/webview/index',
      // ?state=xxx 上一页接收裁剪后图片地址的状态属性名
      'pages/cropper/index',
      // 管理
      'pages/admin/index',
      // 管理 - 学生档案：创建、编辑、分享
      'pages/admin-student/index',
      // 管理 - 学生档案列表：搜索、列表、编辑、分页、删除
      'pages/admin-student-list/index',
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
        },
      ]
    },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        // @ts-ignore // TAG 这里的类型错误不清楚
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'))
