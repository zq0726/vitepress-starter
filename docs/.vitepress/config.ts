import { defineConfig } from "vitepress";
import { withBase, BASE_URL } from "./common";
import themeConfig from "./themeConfig";
import viteConfig from "./vite";

export default defineConfig({
  // 应用层面的配置
  lang: "zh-ch",
  title: "小庆的笔记", // 网站标题
  titleTemplate: "Blog", // 网站标题后缀- “VitePress | Blog”
  description: "学习笔记", // 网站描述
  base: BASE_URL,
  head: [["link", { rel: "icon", href: withBase("/logo.jpg") }]],
  appearance: true, // 外观切换 - 深色浅色
  ignoreDeadLinks: false, // 当设置为 true 时，VitePress 不会因为死链接而导致构建失败。
  lastUpdated: true, // 显示页面最后更新时间
  cleanUrls: true, // 删除路径中的.html后缀

  markdown: {
    // markdown 解析配置
    // theme: 'material-palenight', // 主体配色
    lineNumbers: true, // 显示行号
  },

  themeConfig: themeConfig,
  vite: viteConfig,
});
