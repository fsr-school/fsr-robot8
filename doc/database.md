><h1>恒星小程序 - 数据库</h1>

- [功能](#%e5%8a%9f%e8%83%bd)
- [数据逻辑](#%e6%95%b0%e6%8d%ae%e9%80%bb%e8%be%91)
  - [学生档案](#%e5%ad%a6%e7%94%9f%e6%a1%a3%e6%a1%88)
  - [班级信息](#%e7%8f%ad%e7%ba%a7%e4%bf%a1%e6%81%af)
  - [普通帐户](#%e6%99%ae%e9%80%9a%e5%b8%90%e6%88%b7)
  - [老师帐户](#%e8%80%81%e5%b8%88%e5%b8%90%e6%88%b7)
  - [管理帐户](#%e7%ae%a1%e7%90%86%e5%b8%90%e6%88%b7)
  - [超级管理帐户](#%e8%b6%85%e7%ba%a7%e7%ae%a1%e7%90%86%e5%b8%90%e6%88%b7)
- [数据表](#%e6%95%b0%e6%8d%ae%e8%a1%a8)
  - [`config` 系统配置](#config-%e7%b3%bb%e7%bb%9f%e9%85%8d%e7%bd%ae)

# 功能

- [x] 定时备份数据表
- [ ] 定时打包下载
- [ ] 继续测试 `job_id` 能保存多长时间，目前已测试 `12` 天正常
- [ ] 使用时间执行差异化备份
- [ ] 可以制定差异备份每周一次，完整备份每月一次

# 数据逻辑

## 学生档案
- `基本信息`：
  - 姓名：必填、普通帐户只读。
  - 照片：报名状态必填、普通帐户只读。
  - 联系电话：报名状态必填。
  - 状态：普通帐户不可见，有：咨询、预约、已报名、未续报。
  - 备注：普通帐户不可见。
- 由 `老师帐户` 创建。
- `老师帐户` 可以编辑所有信息。
- `普通帐户` 可以编辑部分信息。
- 由 `管理帐户` 进行绑定和解绑。
- 可以绑定 `5` 个 `普通帐户`。
- 可以绑定 `5` 个 `老师帐户`。
## 班级信息
- 由 `管理帐户` 创建，并指定 `老师帐户` 的访问权限。
- 由 `老师帐户` 进行管理操作。
## 普通帐户
- 帐户
  - 在微信第一次进入时，自动创建。
  - 已有帐户则自动登录。
  - 不能退出登录。
- 绑定
  - 可以绑定 `5` 个 `学生档案`。
  - 可以操作已绑定 `学生档案` 分享二维码邀请其他 `普通帐户` 绑定。
- 管理
  - 查看 `学生档案` 信息。
  - 接收 `学生档案` 相关通知。
  - 管理 `学生档案` 互动功能，如：请假、提交作业、兑换积分、活动报名等。
## 老师帐户
- 帐户
  - 先登录为 `普通帐户`。
  - 由 `管理帐户` 指定为 `老师帐户`。 
- 管理
  - 创建和编辑 `学生档案`。
  - 发布班级公告。
  - 给 `普通帐户` 发私信。
  - 学生评价。
  - 上课状态。
  - 缺补课。
## 管理帐户
- 帐户
  - 先登录为 `普通帐户`。
  - 由 `超级管理帐户` 指定为 `管理帐户`。 
- 管理
  - `普通帐户`
      - 查看、冻结。
      - 绑定为 `老师帐户`。
      - 绑定或解绑 `学生档案`。
  - `老师帐户`
      - 查看、指定和解除。
  - `班级信息`
      - 查看、创建、删除。
      - 给老师分配 `班级信息`。
      - 添加或删除班级中的 `学生档案`。
## 超级管理帐户
- 帐户
  - 由软件代码配置生成。
- 管理
  - 查看、指定或解除 `管理帐户`。


# 数据表

## `config` 系统配置

```json
[
  {
    "_id": "token",
    "value": {
      "access_token": "微信平台的口令",
      "appid": "小程序appid",
      "expires": "口令到期时间",
      "secret": "小程序密钥"
    }
  },
  {
    "_id": "auth",
    "value": {
      "roles": {
        "admin":["admin.student"],
        "teacher":["teacher.student"],
      },
      "users": {
        // openid
        "oMBkB0TWfwBlqUk-1P6lHi8J-wno":["admin", "teacher"],
      },
      "disable": {
        "roles": [],
        "users": []
      }
    }
  }
]
```

客户端静态配置表
```js
const functionIds = {
  "admin.student": "管理所有学生",
  "teacher.student": "管理班级学生",
}
```