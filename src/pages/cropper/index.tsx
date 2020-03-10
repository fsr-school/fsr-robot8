// @ ts-nocheck
import Taro, { Component, Config } from '@tarojs/taro'
import TaroCropper from '@/components/taro-cropper/index'
// import { connect } from '@tarojs/redux'

import { View } from '@tarojs/components'

import { chooseImage } from '@/services/index'
import './index.scss'


type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  src: string,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

// @connect(({ }) => ({}), (dispatch) => ({}))
/**
 * ## 选择并裁剪图片
 * - 此页面加载后自动打开相册选择图片；
 * - 调用时给页面传参 `?state=xxx`；
 * - 裁剪完成后，将裁剪图片地址更新至上一页的 `xxx` 状态中；
 *
 * prevPage.$component.setState({xxx: url})
 *
 * 示例：
 *
 * Taro.navigateTo({url: '../cropper/index?state=avatarUrl'})
 *
 */
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '恒星 - 图片裁剪'
  }

  constructor(props) {
    super(props);
    this.state = {
      src: '',
    }
  }
  // 组件已挂载
  componentDidMount() {
    chooseImage({}).then(res => {
      if (!res) return;
      const { path } = res[0]
      this.setState({ src: path })
    }).catch(() => {
      Taro.navigateBack()
    })
  }

  onCut(res) {
    // this.setState({
    //   src: res
    // })
    const { state } = this.$router.params

    // 将参数传回上一页
    const pages = Taro.getCurrentPages()
    const prevPage = pages[pages.length - 2] // 上一页
    // 调用上一个页面的setData 方法，将数据存储
    let data = {}
    data[state] = res
    prevPage.$component.setState(data, () => {
      Taro.navigateBack()
    })
  }

  onCancel() {
    Taro.navigateBack()
  }

  render() {
    const { src } = this.state;
    return (
      <View className='page cropper'>
        <TaroCropper
          src={src}
          fullScreen
          width={750}
          height={1200}
          cropperWidth={400}
          cropperHeight={400}
          quality={0.8}
          maxScale={5}
          onCut={this.onCut.bind(this)}
          hideCancelText={false}
          onCancel={this.onCancel.bind(this)}
        />
      </View>
    )
  }
}

export default Index

