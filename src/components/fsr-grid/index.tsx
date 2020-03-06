import Taro, { Component } from '@tarojs/taro'

import { View, Text } from '@tarojs/components'

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
      <View className={'fsr-grid at-row ' + (className || '')}>
        <View className='at-col'>
          <View className="fsr-grid--title">
            <View className='at-icon at-icon-star' style='color:#E14946'></View>积分
            </View>
          <View className="fsr-grid--detail">103分</View>
        </View>
        <View className='at-col'>
          <View className="fsr-grid--title">
            <View className='at-icon at-icon-check' style='color:#37B13F'></View>答题</View>
          <View className="fsr-grid--detail">
            <Text className="g-color-text-paragraph">20</Text>/32题
            </View>
        </View>
        <View className='at-col'>
          <View className="fsr-grid--title">
            <View className='at-icon at-icon-image' style='color:#B1A2DB'></View>相册</View>
          <View className="fsr-grid--detail">
            <Text className="g-color-text-paragraph">10</Text>/169张
            </View>
        </View>
      </View>
    )
  }
}

export default Index
