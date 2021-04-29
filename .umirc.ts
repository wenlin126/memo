import { defineConfig } from "umi";
import { ChainedMap } from "webpack-chain";

/* export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  routes: [
    { path: "/", component: "@/pages/index" },
  ],
  fastRefresh: {},
});
 */

type ConfigType = "mian" | "preload";

export default defineConfig({
  electronBuilder: {
    //可选参数
    buildType: "webpack", //webpack或vite，vite构建速度更快，但兼容性有问题
    mainSrc: "src/main", //默认主进程目录
    preloadSrc: "src/preload", //默认preload目录，可选，不需要可删除
    routerMode: "hash", //路由 只能是hash或memory
    outputDir: "dist_electron", //默认打包目录
    externals: [], //node原生模块配置，打包之后找不到包也需要配置在这里
    rendererTarget: "web", //构建目标electron-renderer或web，使用上下文隔离时，必须设置为web
    //通过 webpack-chain 的 API 修改 webpack 配置。
    mainWebpackChain(config: ChainedMap<undefined>, type: ConfigType) {
      //ConfigType分为main和preload可分别配置F
      // if (type === 'main') {}
      // if (type === 'preload') {}
    },
    builderOptions: {
      //配置参考 https://www.electron.build/configuration/configuration
      appId: "com.test.test",
      productName: "我的备忘录",
      publish: [
        {
          provider: "generic",
          url: "http://localhost/test",
        },
      ],
    }, //electronBuilder参数
  },
  devServer:{
    port:31668
  },
  routes: [{ path: "/", component: "@/pages/index" }],
});
