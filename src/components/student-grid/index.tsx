import Taro, { Component } from '@tarojs/taro'

import FsrGrid from "../fsr-grid/index"

import './index.scss'

export default class Index extends Component {

  render() {

    return (
      <FsrGrid data={[
        {
          icon: { name: 'at-icon-star', color: '#E14946' },
          title: '积分',
          score: '103',
          unit: '分',
          onClick: () => {
          }
        },
        {
          icon: { name: 'at-icon-check', color: '#37B13F' },
          title: '答题',
          score: '20/32',
          unit: '题',
          onClick: () => {
          }
        },
        {
          icon: { name: 'at-icon-image', color: '#B1A2DB' },
          title: '相册',
          score: '10/169',
          unit: '张',
          onClick: () => {
          }
        }
      ]} />
    )
  }
}
