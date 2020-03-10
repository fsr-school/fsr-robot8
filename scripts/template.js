/**
 *  pages 页面快速生成脚本
 *
 *  npm run tem '文件名‘
*/

const fs = require('fs')
const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);

if (!dirName) {
  console.log('文件名不能为空');
  console.log('用法：npm run tep test');
  process.exit(0);
}

// 页面模板构建

const indexTep = `
import Taro, { Component, Config } from '@tarojs/taro'
// import { connect } from '@tarojs/redux'

import { View } from '@tarojs/components'

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
    navigationBarTitleText: '恒星 - xx'
  }

  render() {
    return (
      <View className='page ${dirName}'>

      </View>
    )
  }
}

export default Index

`

// scss 文件模板

const scssTep = `
@import '../../assets/style/theme.scss';

.${dirName}{
  padding: 0;
}
`

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`index.tsx`, indexTep); //tsx
fs.writeFileSync(`index.scss`, scssTep); // scss
process.exit(0);
