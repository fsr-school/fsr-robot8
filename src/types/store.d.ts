
interface UserInfo {
  account: {
    id: number
  },
  profile: {
    avatarUrl: string,
    backgroundUrl: string,
    nickname: string,
    eventCount: number,
    follows: number,
    followeds: number
  }
}
