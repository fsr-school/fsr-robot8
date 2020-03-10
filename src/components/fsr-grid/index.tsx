import Taro, { Component } from '@tarojs/taro'

import { View, Text } from '@tarojs/components'

import './index.scss'

type PageStateProps = {
  className?: string,
  data: Array<{
    icon: {
      name: string,
      color?: string
    },
    title: string,
    score?: string,
    unit?: string,
    onClick?: () => any,
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

  render() {
    const { className, data } = this.props
    return (
      <View className={`fsr-grid at-row ${className || ''}`}>
        {
          data && data.map(res => {
            const { icon, title, score, unit, onClick } = res
            return <View className='at-col' onClick={onClick}>
              <View className="fsr-grid--title">
                {icon && <View className={`at-icon ${icon.name}`} style={`color:${icon.color}`}></View>}
                {title}
              </View>
              <View className="fsr-grid--detail">
                <Text className="fsr-grid--detail-score">{score}</Text>
                <Text className="fsr-grid--detail-unit">{unit}</Text>
              </View>
            </View>
          })
        }
      </View>
    )
  }
}

export default Index
