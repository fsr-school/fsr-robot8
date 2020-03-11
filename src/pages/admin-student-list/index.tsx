
import Taro, { Component, Config } from '@tarojs/taro'
// import { connect } from '@tarojs/redux'

import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

import { getAge } from '@/utils/date'
import { getCloudFileUrl } from '@/utils/image'
import { getStudentList } from '@/services/student'
import './index.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  data: Array<DB.Student.info>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

// @connect(({ }) => ({}), (dispatch) => ({}))
class Index extends Component<IProps, PageState> {

  config: Config = {
    navigationBarTitleText: '恒星 - 学生档案列表'
  }

  // 组件将要挂载
  componentWillMount() {
    // 获取学生档案列表
    getStudentList()
      .then(data => {
        this.setState({ data })
      })
  }

  getStudentDetail(subjects) {
    if (!subjects || subjects.length == 0) return ''
    let { year, season, type, level, classNumber, status } = subjects[subjects.length - 1]
    season = ['春季', '暑假', '秋季', '寒假'][season]
    type = ['阶段', '主题', '创客'][type]
    const n = level * 100 + classNumber
    status = ['待学', '在学', '学完', '停学', '退学'][status]
    return `${subjects.length} [${status}] ${year}${season}${type}班 ${n}`
  }

  render() {
    const { data } = this.state
    return (
      <View className='page admin-student-list'>
        <AtList>
          {
            data && data.map((el) => {
              const { _id, name, sex, birthday, subjects } = el
              const title = name + ' ' + birthday
              const note = this.getStudentDetail(subjects)
              const extraText = `${getAge(birthday)}`
              const avatar = getCloudFileUrl({ type: 'student_avatar', name: _id })
              return <AtListItem
                onClick={() => {
                  Taro.navigateTo({ url: '../admin-student/index?_id=' + _id })
                }}
                className={sex ? 'boy' : 'girl'}
                title={title}
                note={note}
                extraText={extraText}
                arrow='right'
                thumb={avatar}
              />
            })
          }
        </AtList>
      </View>
    )
  }
}

export default Index

