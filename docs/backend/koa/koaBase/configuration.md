# 项目配置

## app/index.js

```shell
const Koa = require("koa");
const { default: koaBody } = require("koa-body");
const router = require("../router/index");
const static = require("koa-static");
const path = require("path");

const app = new Koa();

app.use(
  static(path.join(__dirname, "../../public"), {
    index: false, // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
    hidden: false, // 是否同意传输隐藏文件
    defer: true, // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
  })
);

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配制选项option里, 不推荐使用相对路径
      // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
      // uploadDir: path.join(__dirname, "../public/upload"),
      // keepExtensions: true,
    },
  })
);

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
```

## config/config.default.js

```shell
const dotenv = require("dotenv");
dotenv.config();

module.exports = process.env;
```

## controller/test.controller.js

```shell
  class TestController {
    test(ctx){
      ctx.body = {
        message:"test 页面"
      }
    }
  }

  module.export = new TestController()
```

## router/test.router.js

```shell
const KoaRouter = require("koa-router");
const {test} = require('../controller/test.controller')
```

## router/index.js

```shell
const { genFileList } = require("../utils/getRouter");
const Router = require("koa-router");
const router = new Router();

let fileList = genFileList(__dirname); // __dirname是当前路径，可以修改

fileList.forEach((file) => {
  if (file.name !== "index.js") {
    let r = require(file.path + "/" + file.name);
    router.use(r.routes());
  }
});

module.exports = router;

```

## utils/getRouter

```shell
const fs = require("fs");
// 从目录开始
function genFileList(path) {
  var filesList = [];
  readFile(path, filesList);
  return filesList;
}

// 遍历读取文件
function readFile(path, filesList) {
  files = fs.readdirSync(path); // 需要用到同步读取
  files.forEach((file) => {
    states = fs.statSync(path + "/" + file);
    // ❤❤❤ 判断是否是目录，是就继续递归
    if (states.isDirectory()) {
      readFile(path + "/" + file, filesList);
    } else {
      // 不是就将文件push进数组，此处可以正则匹配是否是 .js 先忽略
      filesList.push({
        path: path,
        name: file,
      });
    }
  });
}

module.exports = {
  genFileList,
};

```

## main.js

```shell
const IP = require("ip");
const app = require("./app/index");
const { APP_PORT } = require("./config/config.default");

app.listen(APP_PORT, () => {
  console.log(`服务器运行在 http://${IP.address()}:${APP_PORT} 上`);
});
```

## .env 文件

```shell
APP_PORT = 6001
```

## package.json

> 添加启动脚本 配置入口文件

```shell
  "main": "src/main.js",
  "scripts":{
    "start":"nodemon src/main.js"
  }
```
