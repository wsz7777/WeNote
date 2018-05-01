[TOC]

# ftpSever

​	 `ftp` 服务是客户机向服务器上传文件所用的服务，虽然通过 `git` 、 `svn` 也可以做到相同的效果，但是对于单个文件夹使用 `ftp` 。使用 `vsftpd` 作为 `FTP` 服务端，`FileZilla` 作为客户端。

## Install ftp

​	在 `Linux` 系统中安装 `ftp` 的服务

```bash
yum install vsftpd -y
```

## Start ftp

```bash
# 开启 ftpServer
service vsftpd start

# 测试ftp服务是否开启
# 1. 本地命令测试
netstat -tunlp
# 查看 PID/Program name 这一列有无: [数字]/vsftpd
# 有的话就是启动成功了
# 2. 公网测试
telnet [公网 IP] [ftp服务的端口号]
```

## Change config file

```bash
vim /etc/vsftpd/vsftpd.conf
# anonymous_enable=YES 改为 anonymous_enable=NO
# 输入 :wq 保存退出
service vsftpd restart
# 重启服务
```

## add ftpUser

```bash
useradd -m -d /home/ftpuser -s /sbin/nologin ftpuser
# useradd -m -d [登录直接进入的目录] -s [使用的shell] 用户名
passwd ftpuser
# passwd ftpuser
```

至此服务可以使用了

## 控制权限

```bash
vim /etc/vsftpd/vsftpd.conf
# 打开配置文件
```

### 修改用户ftp登陆权限

1. 找到 `#chroot_list_enable=YES` ,删除前面的那个#号,表示开启用户是否能登陆ftp限制
2. 找到 `#chroot_list_file=/etc/vsftpd/chroot_list` ,删除前面的那个#号,表示使用该列表中的名字作为限制条件
3. 编辑 `chroot_list` ,加入你要限制的用户名,一行一个用户

 ### 修改用户ftp访问区域权限
​	找到 `#chroot_local_user=YES` ,删除前面的那个#号,表示开启,用户只能访问直接登录的目录

```bash
# 最后 重启ftp服务
service vsftpd restart
```

