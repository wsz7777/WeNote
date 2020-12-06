[toc]

# 注入ENV

## 背景

1. 希望在代码中注入相关的环境变量
2. 希望在代码编译时和运行时的环境变量相同，取值的语法不发生改变

## 环境

- webpack的运行环境（node环境）
- 前端项目本身（浏览器环境）

## 工具

- [env-cmd](https://github.com/toddbluhm/env-cmd#readme) （命令行工具，可以为后续执行的node程序中注入环境变量）
- [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack#readme) (webpack插件：功能是在应用代码中注入环境变量)

## 使用

先下载

```bash
npm i -D env-cmd dotenv-webpack
# or
yarn add --dev env-cmd dotenv-webpack
```



### env-cmd

​	本来是想使用 [`cross-env`](https://github.com/kentcdodds/cross-env)  来实现环境变量的注入，然后在其readme中发现 `env-cmd` 可以方便的吧 `.env` 文件中描述的环境变量注入。两个库的命令对比如下：

```bash
# cross-env
$ cross-env UMI_ENV=dev BUILD_ENV_MODE=test IS_TEST=true NODE_ENV=development OUTPUT_PATH=../../public/ PUBLIC_PATH=http://127.0.0.1:8000/static/ umi dev

# env-cmd
$ env-cmd -f ./dev.env umi dev

# ./dev.env 中内容
UMI_ENV=dev 
BUILD_ENV_MODE=test 
IS_TEST=true 
NODE_ENV=development 
OUTPUT_PATH=../../public/ 
PUBLIC_PATH=http://127.0.0.1:8000/static/
```

如果需要切换环境变量的描述直接把命令修改一下 `env-cmd -f ./dev.env umi dev` =>> `env-cmd -f ./other.env umi dev` 即可~~

### dotenv-webpack

```js
import Dotenv from 'dotenv-webpack';
import path from 'path';
//or
//const Dotenv = require('dotenv-webpack');
//const path = require('path');

const EnvPath = path.join(
  process.cwd(),
  `/env/${process.env.BUILD_ENV_MODE || 'prod'}.env`,
);

// webpack.config.js 中：
module.exports = {
  // ... other config
  plugins: [
      new Dotenv({ path: EnvPath }),
  ]
}
// 集成其他手脚架中需要使用 chainWebpack 添加插件
//chainWebpack(config) {
//  config.plugin('dotenv').use(new Dotenv({ path: EnvPath }));
//},
```



## 优势

​	可以以一个文件的形式描述想要注入的环境变量，并且注入方便