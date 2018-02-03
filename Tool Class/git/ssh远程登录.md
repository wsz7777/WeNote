[TOC]

# 使用SSH远程登录另一台Linux

​	大家使用 `ssh` 比较少，大致了解就是它是用来生成密钥以及远程登录服务器的一种工具或者手段。今天来尝试不用复制粘贴这种耍小聪明的手段来实现它。

## 预备

​	情景约定：

> A：客户机
>
> B：服务器
>
> Bhost：服务器公网ip地址

## 开始操作

### B服务器中操作

```shell
cd ~/		# 进到用户目录下
ls -al		# 查看有没有.ssh目录
# 如果没有
mkdir .ssh	# 创建.ssh目录
cd .ssh		# 进入.ssh目录
touch authorized_keys	# 清空该文件
```

### A客户机操作

```shell
cd ~/.ssh	# 进入到自己电脑下的.ssh文件夹
ls -al		# 查看有无 id_rsa id_rsa.pub 这两个文件
# 如果没有这两个文件
ssh-keygen -t rsa	# 生成密钥
scp ~/.ssh/id_rsa.pub root@Bhost:./.ssh/id_rsa.pub	# 传输密钥至服务器
```

至此密钥设置成功

## 测试

客户机中操作

```shell
ssh root@Bhost
# ssh <用户名>@<服务器ip>
```

查看是否可以成功登陆~~~

## 优化

​	各位同学纷纷表示不想记辣么长的ip地址、想使用自定义名称~~~请在自己电脑（客户机）中操作

```shell
vim ~/.ssh/config	# 打开(或者新建)ssh的配置文件

# 在该文件中添加以下内容
Host name	# 自定义名称为 name
Hostname Bhost 	# 服务器ip
port 22 	# 登录所用的端口号
User root 	# 登录所用用户名
IdentityFile ~/.ssh/id_rsa 	# 密钥地址
Identitiesonly yes		# 表示只通过密钥登陆
# 添加完记得按esc键 并输入 :wq 保存退出

# 此时登录方法：
ssh name
# ok~~~
```

