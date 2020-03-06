import Taro, { Component } from '@tarojs/taro'

import { View } from '@tarojs/components'

import './index.scss'



type PageStateProps = {
  className?: string,
  data: Array<{
    image: string,
    title: string,
    value: string,
  }>
}


type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface Index {
  props: IProps
}

class Index extends Component<IProps, PageState> {

  // @ts-ignore 配置默认参数
  private static defaultProps = {
    mode: 'rect'
  }

  render() {
    const { className } = this.props

    return (
      <View className={'at-row ' + (className || '')}>
        <View className='at-col'>
          <View className='at-icon at-icon-edit'></View>积分
          </View>
        <View className='at-col'>
          <View className='at-icon at-icon-edit'></View>答题
          </View>
        <View className='at-col'>
          <View className='at-icon at-icon-edit'></View>相册
          </View>
      </View>
    )
  }
}

export default Index
