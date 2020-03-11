import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import './index.scss'


export default class Index extends Component {
  render() {
    const { url } = this.$router.params
    return (
      <WebView src={decodeURIComponent(url)}></WebView>
    )
  }
}

