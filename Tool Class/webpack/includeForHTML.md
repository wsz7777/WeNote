[toc]

# 在HTML使用include语法

## 背景意义

1. 方便的引入一些公共代码，实现简单的长期维护
2. 方便html的组织结构

## 使用

```html
<!--# include file="/template.html" -->
```

## 踩坑

我在我的 index.html 中直接写了

```shell
# 项目目录
.
├── index.html
└── template.html
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <!--# include file="/template.html" -->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

但是他并不生效。

初始我认为是不支持file://协议去加载，然后使用nodejs开启了一个静态资源服务，让他在本地网络上可访问

```js
const path = require("path");
const express = require("express");

const app = express();

app
  .use(express.static(path.join(__dirname)))
  .listen(4000);
```

但是还不行，仔细看了看浏览器报错，随后找到一些资料，先是找到了功能不可用的一些

> chrome 80版本之前支持导入HTML https://www.chromestatus.com/features/5144752345317376
>
> chrom移除v0功能的一些讨论 ：
>
> https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade
>
> https://groups.google.com/a/chromium.org/g/blink-dev/c/h-JwMiPUnuU/m/sl79aLoLBQAJ?pli=1
>

然后找到了可用的案例（目前浏览器不支持，属于废弃功能，以后也不会支持）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="import" href="/template.html" /> <!-- 这里引入html模板 -->
  </head>
  <body>
    <script>
      // 这里通过脚本获取到然后加载到dom中
      var content = document.querySelector('link[rel="import"]').import;
			document.body.appendChild(content)
    </script>
  </body>
</html>

```

最后发现，还是webpack流弊~~~通过增加一个pulgins解决~ 

先是找到了`ssi-compile-webpack-plugin` 但是启动报错，发现和项目中已有的html解析插件不适用，后来找到了 `ssi-webpack-plugin` 可用~ [传送门~~~](https://www.npmjs.com/package/ssi-webpack-plugin) 但是！！！有点小问题~解析模板的路径问题（详情见后文）

## 插件应用

新增webpack后的项目目录结构：

```
.
├── webpack.config.js
├── index.html
└── template.html
```

### 远程html模板获取（常用）

```js
// webpack.config.js
const SSICompileWebpackplugin = require('ssi-webpack-plugin')
module.exports = {
    // config
    plugin: [
        new SSICompileWebpackplugin({
            publicPath: '',
            localBaseDir: '/',
            minify: false,
            proxy:"",//可以使用代理
            pathRewrite:{
                '^api':"xxx",//支持正则替换
            },
            remoteBasePath:"http://baidu.com",//如果传了此参数，则表示从远程http请求中获取ssi文件的内容
            variable:{
                'QUERY_STRING':"test=1",//如果ssi文件地址里有引用变量,如${QUERY_STRING}，则会用此参数里的对应key的值替换
            }
        })
    ]
}
```

### 本地html加载测试

这个官方例子是解释远程获取文件的路径。然而如果我们适用本地的一些路径就gg了

```js
// webpack配置
const path = require("path");
const SSICompileWebpackplugin = require("ssi-webpack-plugin");

module.exports = {
      plugins: [
        new SSICompileWebpackplugin({
          localBaseDir: path.resolve(__dirname)
        })
      ]
}
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!--# include file="/test.html" -->
  </body>
</html>
```

## 实际应用场景

可以把一些公共sdk的js放在远程模板中，项目发布时（打包编译时）自动获取最新模板。

关键点在于远程模板中不要加载版本号，这样sdk更新时项目无需发布即可获得最新的sdk能力、或者是sdk修复bug时，业务线同学不必花费精力去配合sdk上线时也发布自己的项目。