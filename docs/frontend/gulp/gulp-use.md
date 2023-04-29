# gulp 基本使用

## 配置目录结构

```shell
- gulp-study
  -src
    |-components              //公共组件
      |-Footer.html           //footer
      |-Header.html           //header
    |-css                     //css 文件
      |-index.css
    |-html                    //html 文件
      |-index.html
    |-js                      //js 文件
      |-test.js
    |-sass                    //sass 文件
      |-index.scss
    |-task                    //通道 文件
      |-cssHandler.js
      |-delHandler.js
      |-htmlHandler.js
      |-jsHandler.js
      |-scssHandler.js
      |-watchHandler.js
      |-webHandler.js
    |-plugins.js              //gulp 插件

  -gulpfile.js                //gulp 配置文件
  -README.md

```

## 处理 css sass

- gulp-cssmin
  > 去掉 css 结构
- gulp-autoprefixer
  > css 添加前缀
- gulp-sass

  > 处理 sass

  ```shell
  const { src, dest } = require("gulp");
  const { sass, autoprefixer, cssmin } = require("../plugins");

  const sassHandler = () => {
    return src("./src/sass/\*.scss")
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(dest("./dist/sass"));
  };
  module.exports = {
    sassHandler,
  };
  ```

## 处理 html

- gulp-minify-html
  > 去掉 html 结构
- gulp-file-include

  > 提供了一个 include 方法让我们可以像后端模板那样把公共部分的页面导入进来

  ```shell
  const { src, dest } = require("gulp");
  const { minifyHtml } = require("../plugins");
  const { fileinclude } = require("../plugins");

  const htmlHandler = () => {
    return src("./src/html/*.html")
      .pipe(
        fileinclude({
          prefix: "@@",
          basepath: "./src/components",
        })
      )
      .pipe(
        minifyHtml({
          empty: true,
        })
      )
      .pipe(dest("./dist/html"));
  };

  module.exports = {
    htmlHandler,
  };
  ```

## 处理 javascript

- babel

  > gulp-babel @babel/core @babel/preset-env

- gulp-uglify

  > js 代码丑化

  ```shell
  const gulp = require('gulp');
  const babel = require('gulp-babel');
  const gulpUglify = require('gulp-uglify')

  gulp.task('default', () =>
    gulp.src('src/app.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpUglify())
    .pipe(gulp.dest('dist'))
  );

  ```

## 生成 web 页面

- gulp-webserver

  >

  ```shell
  const { src } = require("gulp");
  const { webServer } = require("../plugins");

  const webHandler = () => {
    return src("./dist").pipe(
      webServer({
        host: "www.zhaoqing.com",
        port: "3465",
        open: "./html/index.html",
        livereload: true, //文件修改时，自动刷新
        proxies: [
          {
          source: "/dt",
          target: "https://www.duitang.com/napi/vienna/feed/unlogin/",
          },
        ],
      })
    );
  };

  module.exports = {
    webHandler,
  };
  ```

## 删除文件

- del

## 统一引入插件

```shell
  const minifyHtml = require("gulp-minify-html");
  const cssmin = require("gulp-cssmin");
  const sass = require("gulp-sass")(require("sass"));
  const autoprefixer = require("gulp-autoprefixer");
  const gulpUglify = require("gulp-uglify");
  const babel = require("gulp-babel");
  const fileinclude = require("gulp-file-include");
  const webServer = require("gulp-webserver");
  const del = require("del");

  module.exports = {
    minifyHtml,
    fileinclude,
    cssmin,
    sass,
    autoprefixer,
    gulpUglify,
    babel,
    webServer,
    del,
  };

```

## gulpfile.js

```shell
const { series, parallel } = require("gulp");
const { htmlHandler } = require("./src/task/htmlHandler");
const { cssHandler } = require("./src/task/cssHandler");
const { sassHandler } = require("./src/task/scssHandler");
const { jsHandler } = require("./src/task/jsHandler");
const { webHandler } = require("./src/task/webHandler");
const { watchHandler } = require("./src/task/watchHandler");
const { delHandler } = require("./src/task/delHandler");

const defaultTask = series(
  delHandler,
  parallel(jsHandler, sassHandler, cssHandler, htmlHandler),
  webHandler,
  watchHandler
);

module.exports.default = defaultTask;

```
