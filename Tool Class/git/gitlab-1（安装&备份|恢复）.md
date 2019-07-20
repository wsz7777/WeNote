[TOC]

# GitLab

## 下载安装

| 项   | 详细      | 备注 |
| ---- | --------- | ---- |
| 系统 | CentOS7.X |      |

想找哪个版本的gitlab请移步 [全部版本的官方地址](https://packages.gitlab.com/gitlab/gitlab-ee) 

### 依赖

```bash
sudo yum install curl policycoreutils-python openssh-server openssh-clients
sudo systemctl enable sshd
sudo systemctl start sshd
```

### 下载

```bash
# wget 获取
wget --content-disposition https://packages.gitlab.com/gitlab/gitlab-ee/packages/ol/7/gitlab-ee-12.0.3-ee.0.el7.x86_64.rpm/download.rpm
```

### 安装

```bash
rpm -i gitlab-ee-12.0.3-ee.0.el7.x86_64.rpm
```

### 配置&&启动

```bash
# 初始化配置
sudo gitlab-ctl reconfigure

# 启动
sudo gitlab-ctl restart
```

## 备份&&恢复

### 备份数据 

```bash
gitlab-rake gitlab:backup:create
```

备份存放地址：`/var/opt/gitlab/backups` ，备份文件名类似于

> 1551348773_2019_07_20_10.0.0-ee_gitlab_backup.tar

### 恢复

#### 本机直接恢复

没有迁移服务器，只是单纯回滚数据操作

##### 停止数据连接

```bash
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq
```

##### 使用备份恢复

```bash
# gitlab-rake gitlab:backup:restore BACKUP=[备份文件编号]
gitlab-rake gitlab:backup:restore BACKUP=1551348773_2019_07_20_12.0.3-ee
```

指令执行过程中有两次交互，都输入`yes`即可。

##### 启动gitlab

```bash
sudo gitlab-ctl start
```

#### 服务迁移并恢复

**注意**新服务器上的Gitlab的版本必须与创建备份时的Gitlab版本号相同。

迁移服务至新的服务器，只需要在新服务器上安装与旧服务器版本相同的 `gitlab` 服务，并且把备份文件拷贝至新服务器的 `/var/opt/gitlab/backup` 目录下即可，之后按照 本机直接恢复 的流程做即可。

##### 注意

可能遇到没有权限备份读取，此时直接使用以下命令修改文件权限即可

```bash
# chmod 777 [备份文件名]
chmod 777 1551348773_2019_07_20_10.0.0-ee_gitlab_backup.tar
```

## 升级

### 下载软件包

```bash
wget --content-disposition https://packages.gitlab.com/gitlab/gitlab-ee/packages/ol/7/gitlab-ee-11.8.9-ee.0.el7.x86_64.rpm/download.rpm
```

### 关闭数据连接

```bash
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq
gitlab-ctl stop nginx
```

### 更新

```bash
rpm -Uvh gitlab-ee-11.8.9-ee.0.el7.x86_64.rpm
```

### 重启服务

```bash
sudo gitlab-ctl restart
```

### 注意！！！

1. 迁移至新的服务器上，记得重改gitlab配置例如

	```bash
	vim /etc/gitlab/gitlab.rb
	
	# 把 http://gitlab.example.com 记得改掉
	external_url 'http://gitlab.example.com'
	```

	