import Taro, { Component, Config } from '@tarojs/taro'
// import { connect } from '@tarojs/redux'

import { View, Picker, Input } from '@tarojs/components'
import { AtAvatar, AtButton, AtRadio, AtTextarea, AtToast } from 'taro-ui'

import { avatarBg, getCloudFileUrl } from '@/utils/image'
import { easyCompare, appShareAppMessage } from '@/utils/index'
import { setStudent, createStudent, getStudent } from '@/services/student'
import { uploadImage } from '@/services/index'
import { showSuccessToast } from '@/utils/toast';

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

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  _id?: string,
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

// @connect(({ }) => ({}), (dispatch) => ({}))
class Index extends Component<IProps, PageState> {

  // 记录更新前的状态
  oldState: PageState

  config: Config = {
    navigationBarTitleText: '恒星 - 学生档案 '
  }

  constructor() {
    super(...arguments)
    this.state = {
      _id: undefined,
      name: '',
      sex: true,
      avatarUrl: '',
      birthday: pickerData.value,
      remark: '',
      errId: 0,
    }
    // 结构只初始化一次
    this.oldState = { ...this.state }
  }

  // 组件将要挂载
  componentWillMount() {
    const { _id } = this.$router.params
    if (_id) {
      // 获取学生档案
      getStudent({ _id })
        .then(res => {
          res.avatarUrl = getCloudFileUrl({ type: 'student_avatar', name: _id })
          this.updateOldState(res)
          this.setState(res)
        })
    }
  }

  // 组件已完成更新显示
  componentDidUpdate() {
    const { _id, avatarUrl } = this.state
    if (_id && avatarUrl != this.oldState.avatarUrl) {
      this.uploadImage(_id, avatarUrl, url => {
        url = getCloudFileUrl({ type: 'student_avatar', name: _id, update: true })
        this.updateOldState({ avatarUrl: url })
        this.setState({ avatarUrl: url })
      })
    }
  }

  updateOldState(data) {
    const res = Object.assign({}, this.state, data)
    for (const k in this.oldState) {
      this.oldState[k] = res[k];
    }
  }

  isChange() {
    return easyCompare(this.oldState, this.state)
  }

  // 上传头像
  uploadImage(_id, avatarUrl, cb) {
    if (!_id) return
    uploadImage({
      type: 'student_avatar',
      filePath: avatarUrl,
      name: _id,
    }).then(cb)
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
    const { _id, avatarUrl, name, sex, birthday, remark } = this.state
    if (avatarUrl == '') {
      this.setState({ errId: 1 })
      return
    }
    if (!/^.{2,20}$/.test(name)) {
      this.setState({ errId: 2 })
      return
    }
    if (_id) {
      // 保存学生档案
      setStudent({ _id, name, sex, birthday, remark })
        .then(() => {
          this.updateOldState({})
          this.forceUpdate()
          showSuccessToast({ title: '保存成功' })
        })
      return
    }
    // 创建学生档案
    createStudent({ name, sex, birthday, remark })
      .then(res => {
        const { _id } = res
        this.uploadImage(_id, avatarUrl, url => {
          const data = {
            _id,
            avatarUrl: url
          }
          this.updateOldState(data)
          this.setState(data)
          showSuccessToast({ title: '创建成功' })
        })
      })
  }

  onClickAvatar() {
    Taro.navigateTo({ url: '../cropper/index?state=avatarUrl' })
  }

  onShareAppMessage(res) {
    const { _id } = this.state
    if (!_id) return appShareAppMessage()
    // 来自页面内转发按钮
    if (res.from === 'button') {
      // console.log(res.target)
    }
    return {
      title: '恒星 - 邀请您绑定学生档案',
      path: '/pages/admin/index?id=123'
    }
  }

  render() {
    const { _id, avatarUrl, name, sex, birthday, remark, errId } = this.state
    const isChanged = this.isChange()
    return (
      <View className='page admin-create-student'>
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
        <View className="admin-create-student__item">
          <View><AtButton className='share-bt' disabled={!_id} openType='share'>分享</AtButton></View>
          <View><AtButton onClick={this.onSubmit.bind(this)} disabled={isChanged}>{_id ? '保存' : '创建'}</AtButton></View>
        </View>
      </View>
    )
  }
}

export default Index

