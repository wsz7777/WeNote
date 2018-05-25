[TOC]

# NVM

`mvn`官方版本只支持`Linux`以及`Linux`的各种发行版本。在`window`下用`nvm`请移步`nvm-windows`



## before Install

安装之前先卸载全局的node

```Bash
#查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
npm ls -g --depth=0 

#删除全局 node_modules 目录
sudo rm -rf /usr/local/lib/node_modules

#删除 node
sudo rm /usr/local/bin/node 

#删除全局 node 模块注册的软链
cd  /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm 

```



## Install nvm

用curl安装

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.7/install.sh | bash
```

用wget安装

```Bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.7/install.sh | bash
```



## nvm install node

默认下载最新版本

```Bash
nvm install node
```



### 加速nvm下载

国内用nvm可能时快时慢，很确定，这是镜像源的问题，那现在把镜像源换一下换成国内淘宝的：

先用vim打开配置文件

```bash
vi ~/.bash_profile
```

在打开文件中添加：

```bash
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
```

