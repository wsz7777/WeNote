[TOC]

今天踩了一个linux的坑，特来弥补
# Cent OS 手动配置网络ip
日常运维中是需要手动配置linux的ip
## 进入配置文件
```linux
# vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

## 查看ip
```linux
ip addr
```

## 查看网关
```linux
netstat -r
# 找到 gateway 下第一行显示 gateway 的地方
netstat -rn
# 对照gateway显示的地方，记录ip地址。此ip即为网关
```

## 重启网络服务
```linux
systemctl restart network.service
```

## 通过ping检查网络是否连接
```linux
ping -c 4 www.baidu.com
```