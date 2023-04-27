# 使用 rollup 构建一个 js 库

## 1、全局安装 rollup

```shell
yarn global add rollup
```

## 2、增加 rollup.config.js

```javascript
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

export default {
  input: "source/index.js", // 入口文件
  output: {
    // file: 'bundle.js', // 输出单个文件时使用
    dir: "lib", // 输出多个文件时使用
    format: "es", // 输出模式
    exports: "named", // 入口文件有多个导出时，取消警告
    preserveModules: true, // 保留模块结构
    preserveModulesRoot: "source", // 将保留的模块放在根级别的此路径下
  },
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**", // 只编译我们的源代码
    }),
    terser(), // ES6代码压缩
    cleanup(), // 清除注释等
    commonjs(),
  ],
  external: [/@babel\/runtime/],
};
```

## 3、package.json

```json
{
  "scripts": {
    "clean": "node bin/clean.js --dir lib",
    "lib": "rollup --config build/rollup.config.js --silent"
  }
}
```

## 4、打包

```shell
yarn lib
```

#### output.format

```markdown
1、cjs - CommonJS，适用于 Node 和 Browserify/Webpack，使用 require 导入，exports 导出；如果设置了 output.esModule:true，会增加 Object.defineProperty(exports,'\_\_exModule',{value:true}); 设置，表示导出的是 ES 模块命名空间
2、es - 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入，使用 import 导入，export 导出，rollup 的默认打包方式
3、amd - 异步模块定义，用于像 RequireJS 这样的模块加载器
4、iife - 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
5、umd - 通用模块定义，以 amd，cjs 和 iife 为一体
6、system - SystemJS 加载器格式
```

#### \*使用 babel

```markdown
rollup 打包的结果是 ES6，如果需要兼容低版本，则需要 babel

1、配置 babel 预设
// src/.babelrc
{
"presets": [
[
"@babel/preset-env",
{
"modules": false, // 不允许 babel 转码为 commonjs，让 rollup 处理 // [!code focus]
"loose": true // 某些情况会导致 class 编译报错
}
]
]
}
参数说明：
a: modules 必须设置为 false，否则 Babel 默认将代码编译为 Commonjs 的模块，Rollup 处理时将会出错
b: loose 是否设置使用宽松模式，宽松模式使 Babel 在编译代码不完全按照 ES6 语义进行编译，而是编译成更接近于我们手写代码的形式，这样好处除了使代码更加精简，还会避免产生副作用。典型的是对 ES6 class 语法进行转译的区别：如果不是用宽松模式，ES6 的方法通过 Object.defineProperty 进行定义，副作用导致 treeshaking 失效；如果使用宽松模式，则直接在原型链上进行定义。

2、配置 babelHelpers
如果在 babel 插件中设置使用 runtime 模式，如下
babel({
babelHelpers: 'runtime', // 默认 bundled，但需要显示设置
})

1、安装：yarn add @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/runtime @rollup/plugin-babel

// rollup.config.js 中：
2、import babel from "@rollup/plugin-babel"
3、external 中排除['@babel/runtime']相关依赖

// .babelrc 中：
4、使用@babel/plugin-transform-runtime 插件
{
...,
"plugins": ["@babel/plugin-transform-runtime"]
}
```

#### \*常用插件

```markdown
@rollup/plugin-node-resolve --- rollup 无法识别 node_modules 中的包，帮助 rollup 查找外部模块，然后导入

@rollup/plugin-commonjs --- 将 CommonJS 模块转换为 ES6 供 rollup 处理

@rollup/plugin-babel --- ES6 转 ES5，让我们可以使用 ES6 新特性来编写代码

@rollup/plugin-eslint --- js 代码检测

@rollup/plugin-require-context --- 使用 require.context 语法

@rollup/plugin-alias --- 设置别名，比如将 src 目录设置别名为 @

rollup-plugin-terser --- 压缩 js 代码，包括 ES6 代码压缩

rollup-plugin-cleanup --- 去除注释等无效代码
```

#### \*参考文档

[rollup 官方文档](hhttps://rollupjs.org/guide/zh/#introduction)

[rollup 官方插件](https://github.com/rollup/plugins/tree/master/packages)

[babel 官方文档](https://www.babeljs.cn/docs/usage)

[Rollup 配置（Babel7）](https://xiaogliu.github.io/2019/07/24/rollup-config/)
