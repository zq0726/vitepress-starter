# 环境搭建

## 添加基本的依赖

```shell
pnpm init

# 添加 路由，请求 插件
pnpm add koa koa-router koa-body koa-static ip
pnpm add dotenv

```

## 系统 目录配置

```shell
koa-begin
- src
  |- app                                    // app 页面
  |  |- index.js                            // 项目起始文件
  |- config                                 // 项目的一些配置
  |  |- config.default.js                   // 环境变量配置
  |- controller                             // 控制器目录
  |  |- test.controller.js                  // test 控制器
  |- router                                 // 路由目录
  |  |- test.router.js                      // test 路由
  |  |- index.js                            // 路由自动引入文件
  |- utils                                  // 工具文件夹
  |  |- getRouter.js                        // 路由自动引入的方法
- public                                    // 项目静态文件夹
- main.js                                   // 项目启动文件
- .env
- package.json
```
