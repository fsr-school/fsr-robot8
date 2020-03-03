@connect(({ my }) => ({
  my
}), (dispatch) => ({
  eLogin() {
    dispatch({
      type: 'my/eLogin',
    })
  },
  eGetUserInfo() {
    dispatch({
      type: 'my/eGetUserInfo',
    })
  },
  eSetUserInfo(payload) {
    dispatch({
      type: 'my/eSetUserInfo',
      payload
    })
  },
}))
