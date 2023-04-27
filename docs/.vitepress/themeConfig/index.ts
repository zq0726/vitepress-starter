import { getNav, getSidebar } from "./menu";

export default {
  logo: "/logo.jpeg",
  nav: getNav(),
  sidebar: getSidebar(),
  i18nRouting: true,
  outline: {
    label: "导航",
  },
  docFooter: {
    prev: "上一节",
    next: "下一节",
  },
  footer: {
    message: "Released under the MIT License.",
    copyright: `Copyright © 2022-${new Date().getFullYear()} YanLuPei`,
  },
  sidebarMenuLabel: "菜单",
  returnToTopLabel: "返回顶部",
  lastUpdatedText: "上次更新",
  darkModeSwitchLabel: "外观",
  langMenuLabel: "切换语言",
};
