# gulp 介绍

[gulp 官网](https://www.gulpjs.com.cn/)

## 安装 gulp 添加配置文件

```shell
pnpm add gulp -D
type nul> gulpfile.js //创建配置文件
```

> **gulp 常用 api**

- **gulp.task()**

  > 语法 ：gulp.task(任务名称，任务处理函数)

  > 作用：创建一个基于流的任务

  ```shell
  例子：
  gulp.task('htmlHandler',()=>{
    // 找到 html 源文件，进行压缩，打包，放入指定目录
  })
  ```

- **gulp.src()**

  > 语法 ： gulp.src(路径信息)

  > 作用：找到源文件

  ```shell
  书写方式：
  gulp.src('./a/b.html')
    找到一个具体的文件

  gulp.src('./a/*.html')
    找到a 文件夹下所有的hmtl 文件

  gulp.src('./a/**')
    找到a 文件夹下所有的文件

  gulp.src('./a/**/*')
    找到a 文件夹下所有目录下的所有文件

  gulp.src('./a/**/*.html')
    找到a 文件夹下所有目录下的 html 文件
  ```

- **gulp.dest()**

  > 语法：gulp.dest(路径信息)

  > 作用：把一个内容放入指定目录中

  ```shell
    gulp.dest('./dist')
      把接收到的内容放入 dist 下
  ```

- **gulp.watch()**

  > 语法：gulp.watch(路径信息，任务名称)

  > 作用：监控指定目录下的文件，一旦发生变化，重新执行后面的任务

  ```shell
    gulp.wath('./src/page/*.html',htmlHandler)

    当指定文件下的内容发生改变后，将重新执行 htmlHandler
  ```

- **gulp.series()**

  > 语法：gulp.series(任务 1，任务 2，任务 3...)

  > 作用：逐步执行多个任务 （同步从前向后）

- **gulp.parallel()**

  > 语法： gulp.parallel(任务 1，任务 2，任务 3 ...)

  > 作用： 并行开始多个任务

- **gulp.pipe()**

  > 管道函数

  > 所有的 gulp api 都是基于 pipe 通道进行执行

  > 接收当前流，进入下一个流过程的管道函数

  ```shell
    gulp.src().pipe(压缩任务).pipe(转码).pipe(gulp.dest('/dist'))
  ```
