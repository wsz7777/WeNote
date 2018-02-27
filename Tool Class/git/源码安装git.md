[TOC]

# git 的安装

​	我们做代码开发进行团队协作，自然得掌握 `git` 的N中安装方式咯~

## 安装平台&方式

​	 `git` 的安装有多种方式：源码安装，包管理工具安装，软件方式安装。安装平台要有 `Linux` 、 `Windows` 、 `mac` 三种。而 `Linux`  中又会分 `Ubuntu` 类和 `CentOS` 两类。 `Ubuntu` 类可以直接通过包管理工具安装。而 `CentOS` 通过包管理工具安装只能获取到 `1.8.3` 版本，若想安装最新版则需要通过源码安装方式安装。`Windows` 和 `mac`直接从官网下载安装就好了，基本鼠标点点点就好了。今天在这儿主要介绍一下源码安装的方式。

## CentOS中安装git

### 查看最新版本

​	到 `git` 官方网站 `https://git-scm.com/` 查看最新本。获取源码的地址为： `https://github.com/git/git/archive/版本号.tar.gz` 目前做测试的最新版是四天前刚更新的 `v2.16.2` 版本，所以获取地址为： `https://github.com/git/git/archive/v2.16.2.tar.gz` 。

### 环境准备

```shell
# 安装依赖
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
yum install gcc perl-ExtUtils-MakeMaker

# 卸载自带git
yum remove git
```

### 安装最新版git

```shell
# 创建git文件夹
cd /usr/local/
mkdir git
cd git

# 下载
wget https://github.com/git/git/archive/v2.16.2.tar.gz
# 解压
tar -xzf v2.16.2.tar.gz

# 编译
cd git-2.16.2
make prefix=/usr/local/git all
make prefix=/usr/local/git install

rm -rf v2.16.2.tar.gz	# 完成后清除安装包
rm -rf git-2.16.2	# 完成后清除编译文件

# 配置环境变量
vim /etc/profile
# 添加环境变量至该文件中
export PATH="/usr/local/git/bin:$PATH"

source /etc/profile # 使环境变量立即生效

# 查看版本号确认安装成功
git --version
```

