import Taro, { Component, Config } from '@tarojs/taro'

import { View, Text, Button } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from "taro-ui"

// import StudentBar from "@/components/student-bar/index";
// import FsrGrid from "@/components/fsr-grid/index";
import { StudentBar, FsrGrid } from "@/components/index";

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

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component<IProps, PageState> {
  state = {}

  config: Config = {
    navigationBarTitleText: '恒星 - 测试界面'
  }


  render() {
    return (
      <View className='page my'>
        <View className="my-user-info">
          <AtAvatar circle size='large' className='my-avatar' image='https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIT8YlU9LxIMVTmfAIbTMZYxe2PSOQia0SYflsiatPdpsyKtyuERuPNuibhyAyIvRWNYrSGqbEcSvRcA/132'></AtAvatar>
          {/* <Button openType="getUserInfo">登录</Button> */}
          <View className="my-nickname">李恒(11恒星机器人教育)<View className='at-icon at-icon-edit'></View></View>
          <StudentBar />
        </View>
        <FsrGrid className="my-user-score" data={
          [
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
              title: '积分',
              value: '领取中心'
            },
            {
              image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
              title: '答题',
              value: '找折扣'
            },
            {
              image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
              title: '相册',
              value: '领会员'
            }
          ]
        } />

        <AtList>
          <AtListItem title='帮助' arrow='right'
            iconInfo={{
              size: 25, color: '#37B13F', value: 'help',
            }} />
          <AtListItem title='设置' arrow='right'
            iconInfo={{
              size: 25, color: '#78A4FA', value: 'settings'
            }} />
          <AtListItem title='管理' arrow='right'
            iconInfo={{
              size: 25, color: 'red', value: 'user'
            }} />
        </AtList>
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
