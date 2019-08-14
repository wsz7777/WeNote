[TOC]

# 防火墙

## firewall--基础篇

### 基础

#### 1、查看firewall服务状态

systemctl status firewalld

#### 2、查看firewall的状态

firewall-cmd --state

#### 3、开启、重启、关闭、firewalld.service服务

##### 开启

```shell
service firewalld start
```

##### 重启

```shell
service firewalld restart
```

##### 关闭

```shell
service firewalld stop
```

#### 4、查看防火墙规则

```shell
firewall-cmd --list-all 
```

#### 5、查询、开放、关闭端口

##### 查询端口是否开放
```shell
firewall-cmd --query-port=8080/tcp
```

##### 开放80端口
```shell
firewall-cmd --permanent --add-port=80/tcp
```

##### 移除端口
```shell
firewall-cmd --permanent --remove-port=8080/tcp
```

##### 重启防火墙(修改配置后要重启防火墙)

```shell
firewall-cmd --reload
```

##### 参数解释
1. `firwall-cmd`：是`Linux`提供的操作`firewall`的一个工具；
2. `--permanent`：表示设置为持久；
3. `--add-port`：标识添加的端口；
4. `--remove-port`：标识移除的端口；



## iptables--基础篇

### 1、基本操作

#### 查看防火墙状态
```shell
service iptables status  
```

#### 停止防火墙
```shell
service iptables stop  
```

#### 启动防火墙
```shell
service iptables start  
```

#### 重启防火墙
```shell
service iptables restart
```

#### 永久关闭防火墙
```shell
chkconfig iptables off  
```

#### 永久关闭后重启
```shell
chkconfig iptables on　
```

### 2、开启80端口

```shell
vim /etc/sysconfig/iptables

# 加入如下代码
# -A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
# 保存退出后重启防火墙

service iptables restart
```

