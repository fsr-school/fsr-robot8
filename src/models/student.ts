import { createStudent } from '@/services/student'

export default {
  namespace: 'student',
  state: {
    sex: true,
  },
  effects: {
    *eCreateStudent({ payload }, { call, put }) {
      const { _id, avatarUrl } = yield call(createStudent, payload)
      yield put({
        type: 'updateState',
        payload: {
          ...payload,
          _id,
          avatarUrl,
        }
      })
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
