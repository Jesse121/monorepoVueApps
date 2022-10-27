因为之前做过一个技术栈为 vue3+vite+elementPlus 的后台管理系统项目，当时为了方便创建类似项目还搭建了项目模板（github：[vue3-vite-elementPlus-admin](git@github.com:Jesse121/vue3-vite-elementPlus-admin.git)）。  
随着公司业务发展类似项目越来越多，一个仓库一个项目的管理形式弊端越来越突出：

1. 每个项目都要搭建 eslint+prettier+commitLint+styleLint 等代码规范校验
2. 每个项目都要搭建许多类似的常用组件和创建公共 utils 函数
3. 各个项目的主要依赖库（vue,elementPlus）版本可能不一致，且存在重复安装
4. 有时候组件改动会涉及到多个项目都要手动更改

<!-- more -->

考虑到我们的不同项目在业务和组件交互上存在很多相似性，可以考虑在不同项目中使用公共组件库和公共依赖库。目前现有的模块复用 采用 monorepo 风格管理项目就比较合适了。
monorepo 可以让多个模块共享同一个仓库，因此他们可以共享同一套构建流程、代码规范也可以做到统一，特别是如果存在模块间有共享公共组件的情况，查看代码、修改 bug、调试等会更加方便。

市场上搭建 monorepo 项目常用的有两种方案

1. yarn+lerna
2. pnpm

考虑到 pnpm 内置了对 monorepo 的支持，且搭建简单快捷，门槛较低，使用方便的原因，我们这里采用 pnpm 方案。具体使用 pnpm 的好处可以参考[为什么推荐使用 pnpm](https://zhuanlan.zhihu.com/p/419399115)

### 初始化项目

新建 monorepoVueApps 文件夹，在该文件夹中新建 pnpm-workspace.yaml 文件，这个文件定义了工作空间的根目录，并能够使您从工作空间中包含 / 排除目录

```yaml
packages:
  # 所有在 packages/  子目录下的模块
  - "packages/**"
  # 不包括在 test 文件夹下的模块
  - "!**/test/**"
```

在 monorepoVueApps 文件夹下创建以下目录

```
|-- packages
|   |-- apps           // 项目仓库文件夹 包含多个vue项目
|   |-- components     // 公共组件库
|   |   |-- basic      // 基础组件
|   |   |-- layout     // 布局组件
|   |-- hooks          // 公共hooks库
|   `-- utils          // 公共工具函数库
`-- pnpm-workspace.yaml
```

### 安装依赖

#### 全局安装 pnpm

```sh
npm i pnpm -g
```

#### 生成 package.json

在 packages 文件夹下的每个文件夹中分别执行

```sh
pnpm init -y
```

包名一般都通用为命名空间+项目名，这里命名空间名称为@vueapps

#### 安装公共依赖

这里将相关开发工具和公共库安装至项目顶层，在更目录下执行

```sh
pnpm add vue vue-router pinia axios element-plus @element-plus/icons-vue @vueuse/core  -w
pnpm add typescript vite @vitejs/plugin-vue @vitejs/plugin-vue-jsx vue-tsc less vite-plugin-vue-setup-extend-plus -wD
```

### 创建 vue3 项目 demo

```sh
cd packages/apps
pnpm create vite demo -- --template vue-ts
```

生成 demo 项目后修改包名和依赖包

```json
{
  "name": "@vueapps/demo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

在 demo 目录下执行`pnpm run dev`,即可看到 vue3 项目正常运行

### 项目中引入 vue-router,pinia

### 按需导入 elementPlus

在顶层目录安装 unplugin-vue-components unplugin-auto-import 这俩插件

```sh
pnpm add unplugin-vue-components unplugin-auto-import -wD
```

修改 vite.config.ts

```ts
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

### vue3 api 自动导入

在 vite.config.ts 文件中添加配置

```ts
plugins: [
  //...
  AutoImport({
    //...
    imports: ["vue"],
  }),
];
```

```sh
pnpm add vue-global-api -wD
```

在 main.ts 中引入 vue-global-api

```ts
//main.ts
import "vue-global-api";
```

**注意** 如果项目中使用了 eslint，直接在文件中使用 vue 的 api 会提示报错  
解决办法：

```sh
yarn add vue-global-api  -D
```

```js
// eslintrc.js
module.exports = {
  // ...
  extends: [
    // ...
    "vue-global-api",
  ],
};
```

### 添加公共布局组件

```sh
pnpm add @vueapps/utils --filter @vueapps/demo
```

参考文章：

1. [为什么推荐使用 pnpm](https://zhuanlan.zhihu.com/p/419399115)
1. https://blog.csdn.net/qq_21567385/article/details/118590143
1. https://zhuanlan.zhihu.com/p/562340640
1. https://js-banana.github.io/blog/pages/23154c/
1. https://juejin.cn/post/7055281852789047304
1. https://zhuanlan.zhihu.com/p/562340640
