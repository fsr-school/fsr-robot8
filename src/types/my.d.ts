
type MyPageStateProps = {
  my: {
    _id: string,
    auth: Array<string>,
    nickName: string,
    avatarUrl: string,
    // 是否授权获取用户信息
    scopeUserInfo: boolean,
  }
}

type MyPageDispatchProps = {
  eLogin: () => void
  eGetUserInfo: () => void
  eSetUserInfo: (payload) => void
}

type MyPageOwnProps = {}

type MyPageState = {}

type MyIProps = MyPageStateProps & MyPageDispatchProps & MyPageOwnProps

interface Index {
  props: MyIProps;
}
