import { login, getUserInfo, setUserInfo } from '@/services/my'
let tempAuth = []
let scopeUserInfo = false

export default {
  namespace: 'my',
  state: {},
  effects: {
    *eLogin(_, { call, put }) {
      const res = yield call(login)
      if (!scopeUserInfo) {
        // 使用临时变量先保存权限数组，等用户授权信息获取了再赋值
        tempAuth = res.auth
        delete res.auth
      }
      yield put({ type: 'updateState', payload: res })
    },
    *eGetUserInfo(_, { call, put }) {
      const res = yield call(getUserInfo)
      if (res) yield put({ type: 'updateUserInfo', payload: res })
    },
    *eSetUserInfo({ payload }, { put }) {
      yield put({ type: 'updateUserInfo', payload })
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    updateUserInfo(state, { payload }) {
      const { nickName, avatarUrl } = payload
      if (state.nickName != nickName || state.avatarUrl != avatarUrl) {
        setUserInfo({ uid: state._id, nickName, avatarUrl })
      }
      let res = {
        ...state,
        nickName,
        avatarUrl,
        scopeUserInfo: true
      }
      scopeUserInfo = true
      // 当授权获取用户信息后再赋值
      if (!state.auth || state.auth.length == 0) res.auth = tempAuth
      return res
    },
  }
}
