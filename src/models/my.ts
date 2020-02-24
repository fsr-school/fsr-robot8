import { login } from '@/services/my'

export default {
  namespace: 'my',
  state: {},
  effects: {
    *asyncLogin(data, { call, put }) {
      console.warn(444);
      const res = yield call(login)
      console.warn(8888);

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
