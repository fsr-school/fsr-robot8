import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Picker, Input } from '@tarojs/components'
import { AtAvatar, AtForm, AtButton, AtRadio, AtTextarea, AtToast } from 'taro-ui'

import { avatarBg } from '@/utils/image'
import './index.scss'

// 生日选择初始数据
const pickerData = (() => {
  const nowDate = new Date()
  const year = nowDate.getFullYear()
  const valueYear = String(year - 10)
  const startYear = String(year - 30)
  const endYear = String(year - 3)
  return {
    value: `${valueYear}-1-1`,
    start: `${startYear}-1-1`,
    end: `${endYear}-1-1`,
  }
})()

type PageStateProps = {
  student: {
    name: string,
    sex: boolean,
    avatarUrl: string,
    birthday: string,
    remark: string
  }
}

type PageDispatchProps = {
  eCreateStudent: (payload) => void
}

type PageOwnProps = {}

type PageState = {
  name: string,
  sex: boolean,
  avatarUrl: string,
  birthday: string,
  remark: string,
  errId: number,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ student }) => ({
  student
}), (dispatch) => ({
  eCreateStudent(payload) {
    dispatch({
      type: 'student/eCreateStudent',
      payload
    })
  },
}))
class Index extends Component<IProps, PageState> {

  constructor() {
    super(...arguments)
    const { sex } = this.props.student
    this.state = {
      name: '',
      sex,
      avatarUrl: '',
      birthday: pickerData.value,
      remark: '',
      errId: 0,
    }
  }

  config: Config = {
    navigationBarTitleText: '恒星 - 创建学生档案 '
  }

  onNameChange({ detail }) {
    this.setState({ name: detail.value.replace(/ /gi, ''), errId: 0 })
  }

  onSexChange(sex) {
    this.setState({ sex: sex == '1' })
  }

  onBirthdayChange({ detail }) {
    this.setState({ birthday: detail.value })
  }

  onRemarkChange({ detail }) {
    this.setState({ remark: detail.value.trim() })
  }

  onSubmit() {
    const { avatarUrl, name, sex, birthday, remark } = this.state
    if (avatarUrl == '') {
      this.setState({ errId: 1 })
      return
    }
    if (!/^.{2,20}$/.test(name)) {
      this.setState({ errId: 2 })
      return
    }
    this.props.eCreateStudent({ avatarUrl, name, sex, birthday, remark })
  }

  onClickAvatar() {
    Taro.navigateTo({ url: '../cropper/index?state=avatarUrl' })
  }

  render() {
    const { avatarUrl, name, sex, birthday, remark, errId } = this.state
    return (
      <View className='page admin-create-student'>
        <AtForm onSubmit={this.onSubmit.bind(this)} >
          <View className="fsr-list-item admin-create-student__item">
            <AtToast isOpened={errId == 1} text='必须上传头像' status='error'></AtToast>
            <View className={`fsr-list-item__label ${errId == 1 ? 'error' : ''}`}>头像</View>
            <View className='fsr-list-item__value' onClick={this.onClickAvatar.bind(this)}>
              <AtAvatar circle size='large' image={avatarUrl || avatarBg}></AtAvatar>
            </View>
          </View>
          <View className="fsr-list-item admin-create-student__item">
            <AtToast isOpened={errId == 2} text='姓名最少需要2个字' status='error'></AtToast>
            <View className={`fsr-list-item__label ${errId == 2 ? 'error' : ''}`}>姓名</View>
            <View className='fsr-list-item__value'>
              <Input type='text' placeholder='填写学生真实姓名'
                value={name}
                maxLength={20}
                onInput={this.onNameChange.bind(this)} />
            </View>
          </View>
          <View className="fsr-list-item admin-create-student__item">
            <View className='fsr-list-item__label'>性别</View>
            <View className='fsr-list-item__value'>
              <AtRadio
                options={[
                  { label: '男', value: '1' },
                  { label: '女', value: '0' },
                ]}
                value={sex ? '1' : '0'}
                onClick={this.onSexChange.bind(this)}
              />
            </View>
          </View>
          <View className="admin-create-student__item">
            <Picker mode='date'
              value={pickerData.value}
              start={pickerData.start}
              end={pickerData.end}
              onChange={this.onBirthdayChange.bind(this)}>
              <View className="fsr-list-item">
                <View className='fsr-list-item__label'>出生日期</View>
                <View className='fsr-list-item__value'>{birthday}</View>
              </View>
            </Picker>
          </View>
          <View className="admin-create-student__item">
            <View className='fsr-list-item__label'>详情备注</View>
            <View className='fsr-list-item__label'>
              <AtTextarea
                value={remark}
                onChange={this.onRemarkChange.bind(this)}
                maxLength={200}
                height={200}
                placeholder='如：介绍人、了解途径、学校班级、家长特殊要求、等等...'
              />
            </View>
          </View>
          <AtButton formType='submit'>保存</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default Index

