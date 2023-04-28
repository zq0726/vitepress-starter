// 公共组件
import { Theme, useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h } from "vue";

// 样式文件
import "./style/index";

export default <Theme>{
  ...DefaultTheme,
  Layout: () => {
    const data = useData();

    return h(DefaultTheme.Layout, {
      class: data.frontmatter.value?.layoutClass,
    });
  },
};
