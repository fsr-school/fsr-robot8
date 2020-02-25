
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtList, AtListItem, AtAccordion, AtAvatar } from "taro-ui"
import { get as globalDataGet, set as globalDataSet } from '@/utils/global-data'

import './c-user-info.scss'


export default class Index extends Component {
  state = {
    isLogin: false,
    avatarUrl: '',
    nickName: '',
    openChildren: false,
  }

  componentWillMount() {
    const userInfo = globalDataGet('userInfo')
    if (userInfo) {
      this.setState({
        isLogin: true,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      })
    }
  }

  onGetUserInfo(ret) {
    const userInfo = ret.detail.userInfo
    if (userInfo) {
      globalDataSet('userInfo', userInfo)
      this.setState({
        isLogin: true,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      })
    }
  }
  handleClick(value) {
    this.setState({
      openChildren: value
    })
  }

  render() {
    const { isLogin, avatarUrl, nickName } = this.state
    return (
      <View className="c-user-info">
        {isLogin
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
    )
  }
}

