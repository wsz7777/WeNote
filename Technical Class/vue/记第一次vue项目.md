[TOC]

# 项目基础结构

## 环境搭建
vue-cli 搭建
babel7转译 兼容js的ES6+语法
采用路由懒加载配合webpack的代码分割功能
scss\less等css预处理器

## 使用到的技术

| 名称                | 用途                                             | 备注                        |
| ------------------- | ------------------------------------------------ | --------------------------- |
| vue                 | 基础框架                                         |                             |
| vue-router          | 框架配套路由解决方案                             |                             |
| vuex                | 框架配套数据状态管理解决方案                     |                             |
| vuex-persistedstate | vuex数据持久化解决方案（防止刷新后数据状态丢失） | 数据存储在localStorage中    |
| axios               | 通信解决方案                                     | 使用fetch的话对pc端兼容不全 |
| element-ui          | PC端ui组件库                                     |                             |

# 经历

## 搭建环境

> vue create xxx
> 选择加载的插件：
> vue-router, vuex, sass, babel, eslint, unit-jest

把router.js和store.js分别放在一个单独的文件夹中，方便扩展

## 环境完善

使用 `vue add element-ui` 来添加UI组件的引用（如果想要按需加载请跳过）
通过正常 `npm install axios` 来完成axios组件加载

`main.js` 中：

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./plugins/ElementUI";


Vue.prototype.$store = store; // 解决高阶组件中 $store 为空的问题

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

```



## Vue.config.js配置

```js
module.exports = {
  outputDir: "hahah",//打包时的项目名
  publicPath: "/hahah/static/",//本地实际访问项目的前缀
  devServer: {// api的路由代理
    proxy: {
      "/hahah/api": {
        // ws: true,
        changeOrigin: true,
        target: "http://localhost:7000"
        pathRewrite: {
          "^/hahah/api/": "/"
        }
      }
    }
  }
};

```

