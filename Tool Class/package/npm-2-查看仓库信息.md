[TOC]

# 查看NPM仓库

​	今天学习了两个命令，是用来查看NPM包的信息以及在NPM仓库中模糊搜索的。

## 在NPM仓库中搜索

```bash
$ npm search <package-name>
```

![npmSearchImg](./assets/npmSearchImg.png)

​	这样直接可以搜索到你想要找的包。注意！！！使用这个命令的时候必须使用NPM官方镜像，不会用更换镜像源的请移步[nrm的安装与使用](./nrm安装与使用.md)。

## 在NPM仓库中查看包的详细信息

```bash
$ npm view <package-name>
```

![npmViewImg](./assets/npmViewImg.png)

​	详细信息如图所示。