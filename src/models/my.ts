import { login } from '@/services/my'

export default {
  namespace: 'my',
  state: {},
  effects: {
    *asyncLogin(data, { call, put }) {
      const res = yield call(login)
      yield put({ type: 'updateState', payload: res })
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  }
}
