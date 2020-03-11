declare namespace DB.Student {
  export interface info {
    _id: string,
    name: string,
    sex: boolean,
    birthday: string,
    remark?: string,
    subjects?: Array<{
      year: number,
      season: number,
      type: number,
      level: number,
      classNumber: number,
      status: number,
      date: Date,
    }>
  }
}
