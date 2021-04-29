/**
 * 创建菜单,主进程渲染（建议）
 */
import { Menu, MenuItemConstructorOptions } from "electron";

//定义菜单
const template: MenuItemConstructorOptions[] = [
  /* {
    label: "文件",
    submenu: [
      {
        label: "新建文件",
        //监听事件
        click: function () {
          console.log("ctrl+n");
        },
        //绑定快捷键
        accelerator: "ctrl+n",
      },
      {
        label: "新建窗口",
      },
    ],
  },
  {
    label: "编辑",
    submenu: [
      {
        label: "复制",
        //规则
        role: "copy",
      },
      {
        label: "剪切",
        role: "cut",
      },
      {
        label: "重新加载",
        role: "reload",
      },
    ],
  }, */
];

var m = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(m);
