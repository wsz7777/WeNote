[TOC]

# 只允许使用 ssh 登录主机

## 原因

​	出于安全性的角度考虑，只允许主机被远程登录，而且不允许使用 `用户名/密码` 的方式去登录主机。使用 `ssh` 密钥验证方式更安全一些。

## 方法

​	在 `CentOS` 、 `OS X` 等不同系统上略有差异，但是核心不变：修改配置文件，刷新配置文件使之生效。

```bash
$ sudo vi /etc/ssh/sshd_config
// 或者是进入 root 账户
# vi /etc/ssh/sshd_config

// 总而言之是修改 /etc/ssh/sshd_config 文件中的 PasswordAuthentication 这个属性
PasswordAuthentication yes // 允许 用户名/密码 的方式登录
PasswordAuthentication no // 不允许
```

修改完成之后需要启用此配置文件：

```bash
$ sudo service sshd restart  
// 或
# service sshd restart
```



## 效果

​	本地登录时必定是通过  `用户名/密码` 的方式去登陆，而不允许这种方式登录之后，那也就是说只能通过远程登陆的方式来登录主机了。