```js
robot8
|____.git/                                    git - git 本地仓库目录
|____.vscode/                                 vscode - 配置文件目录
|   |____extensions.json                      vscode - 建议安装插件配置文件
|   |____launch.json                          vscode - runner 运行配置文件
|   |____settings.json                        vscode - 工作空间配置文件
|____cloudfunctions/                          wxCloud - 微信云开发根目录
|   |____common/                              wxCloud - 云函数目录
|____config/                                  Taro - 配置文件目录
|   |____dev.js                               Taro - 开发生成配置文件
|   |____index.js                             Taro - 主配置文件
|   |____prod.js                              Taro - 发布生成配置文件
|____coverage/                                jest - 代码覆盖率目录
|____dist/                                    Taro - 打包生成小程序源码目录
|____doc/                                     project - 开发文档目录
|____scripts/                                 project - 自定义 nodejs 脚本目录
|   |____template.js                          project - 创建 page 模板文件脚本
|____src/                                     Taro - 项目源码目录
|   |____assets/                              project - 项目资源目录
|   |   |____fonts/                           project - 字体与图标资源目录
|   |   |____images/                          project - 图片资源目录
|   |   |____style/                           project - 样式资源目录
|   |   |   |____custom-variables.scss        project - 自定义SCSS变量，覆盖 Taro-ui 的变量
|   |   |   |____theme.scss                   project - 自定义全局风格样式
|   |____components/                          project - 自定义组件根目录
|   |   |____fsr-grid/                        project - 自定义组件目录                         
|   |   |   |____index.scss                   project - 自定义组件样式文件
|   |   |   |____index.tsx                    project - 自定义组件程序文件
|   |   |____index.ts                         project - 自定义组件入口文件
|   |____config/                              project - 项目配置参数
|   |   |____index.ts
|   |____models/                              dva - 数据处理模型目录
|   |   |____index.ts                         dva - 数据处理模型入口文件
|   |   |____my.ts
|   |____pages/                               Taro - 项目页面根目录
|   |   |____index                            Taro - 项目主页目录
|   |   |   |____index.scss                   Taro - 页面样式文件
|   |   |   |____index.tsx                    Taro - 页面程序文件
|   |____services/                            project - 客户端数据服务根目录
|   |   |____api.ts                           project - HTTP 请求接口封装
|   |   |____cloud-api.ts                     project - 微信云函数请求接口封装
|   |   |____wx-api.ts                        project - 微信小程序接口封装
|   |   |____index.ts                         project - 数据服务主文件
|   |   |____my.ts                            project - 数据服务业务逻辑文件
|   |____types/                               dva - 数据结构 TypeScript 说明文件目录
|   |   |____api.d.ts
|   |   |____store.d.ts
|   |____utils/                               project - 通用工具封装目录
|   |   |____global-data.ts                   project - 全局变量管理
|   |   |____logger.ts                        project - 日志打印封装
|   |   |____index.ts
|   |____app.scss                             Taro - 项目入口页面样式文件
|   |____app.tsx                              Taro - 项目入口页面程序文件
|   |____dva.ts                               dva - dva 初始化封装
|   |____index.html                           Taro - 项目 HTML 页面
|____tests/                                   jest - 测试文件根目录
|   |____index.test.js                        jest - jest 测试文件
|____.editorconfig                            vscode - 编辑器格式配置文件
|____.gitignore                               git - git 忽略提交配置文件
|____.npmignore                               npm - npm 忽略提交配置文件
|____.npmrc                                   npm - npm 配置文件
|____babel.config.js                          babel - babel 配置文件
|____CHANGELOG.md                             project - 项目版本更新日志
|____global.d.ts                              Taro - 全局 TypeScript 说明配置文件
|____jest.config.js                           jest - jest 配置文件
|____my-tree.sh                               project - 自定义的 tree 目录生成脚本
|____package-lock.json                        nodejs - nodejs 配置记录，保证迁移一致性
|____package.json                             nodejs - nodejs 配置文件
|____project.config.json                      Taro - 小程序端配置文件
|____README.md                                git - 项目说明
|____sitemap.json                             project - 站点地图，被搜索配置
|____tsconfig.json                            TypeScript - TypeScript 配置文件
```
