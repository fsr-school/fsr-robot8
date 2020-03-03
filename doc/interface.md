><h1>恒星小程序 - 服务端接口</h1>

- [云函数](#%e4%ba%91%e5%87%bd%e6%95%b0)
  - [`backdb` 备份数据库](#backdb-%e5%a4%87%e4%bb%bd%e6%95%b0%e6%8d%ae%e5%ba%93)
    - [`createAllJob` 获取数据库备份文件地址](#createalljob-%e8%8e%b7%e5%8f%96%e6%95%b0%e6%8d%ae%e5%ba%93%e5%a4%87%e4%bb%bd%e6%96%87%e4%bb%b6%e5%9c%b0%e5%9d%80)
    - [`createJob` 获取数据库备份文件地址](#createjob-%e8%8e%b7%e5%8f%96%e6%95%b0%e6%8d%ae%e5%ba%93%e5%a4%87%e4%bb%bd%e6%96%87%e4%bb%b6%e5%9c%b0%e5%9d%80)
    - [`getJobUrl` 获取数据库备份文件地址](#getjoburl-%e8%8e%b7%e5%8f%96%e6%95%b0%e6%8d%ae%e5%ba%93%e5%a4%87%e4%bb%bd%e6%96%87%e4%bb%b6%e5%9c%b0%e5%9d%80)
  - [`common` 公用](#common-%e5%85%ac%e7%94%a8)
    - [`login` 登录 [自动注册]](#login-%e7%99%bb%e5%bd%95-%e8%87%aa%e5%8a%a8%e6%b3%a8%e5%86%8c)
    - [`auth` 获取用户授权列表](#auth-%e8%8e%b7%e5%8f%96%e7%94%a8%e6%88%b7%e6%8e%88%e6%9d%83%e5%88%97%e8%a1%a8)
    - [? `setUserInfo` 更新用户昵称](#setuserinfo-%e6%9b%b4%e6%96%b0%e7%94%a8%e6%88%b7%e6%98%b5%e7%a7%b0)

# 云函数

## `backdb` 备份数据库

定时执行 [每周一4:00]

### `createAllJob` 获取数据库备份文件地址

提交请求备份所有表数据，并将每张表备份任务id保存到 `backdb` 数据表

请求参数：
```json
{
  name: "createAllJob",
  data: {
    "access_token": "xxx", // 选填，用于测试  
  }
}
```

返回数据：无

### `createJob` 获取数据库备份文件地址

提交请求备份指定表数据，并将备份任务id保存到 `backdb` 数据表

请求参数：
```json
{
  name: "createJob",
  data: {
    "access_token": "xxx", // 选填，用于测试 
    "collection": "表名" 
  }
}
```

返回数据：无

### `getJobUrl` 获取数据库备份文件地址

从数据库中取口令，如果超时就重新请求平台，获取后保存并返回。

请求参数：
```json
{
  name: "getJobUrl",
  data: {
    "access_token": "xxx", // 选填，用于测试 
    job_id: "备份任务id"
  }
}
```

返回数据：
```json
{
  result: "备份数据库文件URL"
}
```

## `common` 公用

### `login` 登录 [自动注册]

请求参数：
```json
{
  name: "login"
}
```

返回数据：
```json
{
  result: {
    ...user,
    auth: ["功能id"]
  }
}
```

### `auth` 获取用户授权列表

查询权限配置表，返回用户被授权的所有功能编号。

请求参数：
```json
{
  name: "auth"
}
```

返回数据：
```json
{
  result:["功能id"]
}
```

### ? `setUserInfo` 更新用户昵称

使用微信用户数据[头像、昵称]，更新时自动提交保存。

请求参数：
```json
{
  name: "setUserInfo",
  data:{
    uid: "xxx",
    nickname: "xxx",
    avatarUrl: "xxx",
  }
}
```

返回数据：无
