[toc]

# 发布自己的`npm`包

## 基础准备

- 准备一个`npm`社区的账号 https://www.npmjs.com/signup
- 准备一个有package.json的文件夹

## 发布操作

### 1. 首先在命令行终端登录`npm`

```
npm login
```

然后按照提示输入你注册的用户名和密码

### 2. 进行发布

```
npm publish
```

## 注意

必须使用官方镜像源发布，`cnpm`、`taobao`均是对`npm`官方源进行的同步

推荐使用`nrm`进行镜像源的切换

## other

因近两年开发的项目多了，感觉还是需要打造一个自己趁手的工具库，所以有了 https://github.com/wsz7777/kh-tool 这个项目。已经发布到npm仓库上了，欢迎star