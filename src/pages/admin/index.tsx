
import Taro, { Component, Config } from '@tarojs/taro'
// import { connect } from '@tarojs/redux'

import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"

import './index.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

// @connect(({ }) => ({}), (dispatch) => ({}))
class Index extends Component<IProps, PageState> {
  state = {
  }

  config: Config = {
    navigationBarTitleText: '恒星 - 管理'
  }

  render() {
    return (
      <View className='page admin'>
        <AtList>
          <AtListItem title='创建学生档案' arrow='right'
            onClick={() => {
              Taro.navigateTo({ url: '../admin-student/index' })
            }}
            iconInfo={{
              size: 25, color: '#37B13F', value: 'user'
            }} />
          <AtListItem title='学生档案列表' arrow='right'
            onClick={() => {
              Taro.navigateTo({ url: '../admin-student-list/index' })
            }}
            iconInfo={{
              size: 25, color: '#37B13F', value: 'list'
            }} />
        </AtList>
      </View>
    )
  }
}

export default Index

