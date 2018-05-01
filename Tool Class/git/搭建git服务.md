[TOC]

# 搭建git服务

​	在服务器上（或者随便一台 `Linux` 电脑）安装好 `git` 的情况下我们来搭建一个git服务。这个就属于私人仓库了哦如果你没有设置，其他人是访问不了的昂。

## 基础流程

### 1 将git设置为默认路径

```bash
ln -s /usr/local/git/bin/git-upload-pack /usr/bin/git-upload-pack
ln -s /usr/local/git/bin/git-receive-pack /usr/bin/git-receive-pack
```

​	 `git-upload-pack` 以及 `git-receive-pack` 这两个命令从 `/usr/local/git/bin/` 链接至 `/usr/bin/` 目录下。

> ​	如果你在客户机使用 `git clone` 操作的时候报错可以在服务器中尝试使用这两个命令去解决。
>
> ​	如果你的服务器是 CentOS 系统请安装完git务必使用这两个命令，因为在客户机clone时真的会有问题。

### 2 创建git用户组和用户

​	作用是：用来运行 `git` 服务。

```bash
groupadd git
useradd git -g git
passwd git    # 这里的参数为用户名

# 创建完成后请务必切换到git用户 进行后续操作。切换方式如下
su git
```

### 3 设置文件权限

```bash
cd /home/git/
mkdir .ssh #新建文件夹
chmod 700 .ssh 
touch .ssh/authorized_keys  #新建文件
chmod 600 .ssh/authorized_keys
```

### 4 开放ssh登录

```bash
# 生成密钥请参考《使用git-1（基础）》或自行百度
# 查看密钥
cat ~/.ssh/id_rsa.pub

# 开放ssh登录
vim /etc/ssh/sshd_config
```

​	 在 `sshd_config` 文件中搜到以下三行代码把它们前面的注释符去掉

```bash
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
# 这里我们可以看到公钥存放在.ssh/authorized_keys文件中
```

​	所以我们在 `/home/git` 下创建 `.ssh` 目录，然后创建 `authorized_keys` 文件，并将刚生成的公钥导入进去。

### 5 初始化Git仓库

```bash
cd /home/git
git init --bare test.git
# git init --bare <git仓库名称（以.git结尾）>
```

### 6 客户机测试

```bash
git clone git@123.206.33.197:test.git
# git clone username@ip:gitPath
# gitPath 默认在 /home/username/ 目录下
```

### 7 禁止git用户登录shell

​	注意在生产过程中不希望有任何人通过 `shell` 登录 `git` 用户进行一些改动防止出现直接删掉所有 `git` 仓库或者其他情况影响 `git` 仓库的正常使用。所以禁止任何人通过 `shell` 登录 `git` 。

```bash
vim /etc/passwd
```

在该文件中找到

```bash
git:x:502:502::/home/git:/bin/bash
# 替换成
git:x:502:502::/home/git:/usr/local/git/bin/git-shell
```

​	这样，git用户可以正常通过ssh使用git，但无法登录shell，因为我们为git用户指定的git-shell每次一登录就自动退出。

## 注意事项

### 1 git仓库可以放在任何目录

​	放在/home/git目录下(clone相对于git宿主目录 /home/git/) 

> git clone git@your-ip:test.git

​	放在根目录，新建git目录作为仓库(绝对路径 /git/) 

> git clone git@your-ip:/git/test.git

​	如果域名绑定IP就可以直接用域名clone 

> git clone git@www.mayanlong.com:test.git

### 2 目录权限问题

​	如果不是用git用户创建的，注意以下目录文件的权限问题。 

> .ssh、test.git…

如果有问题，可以把该目录的所属者改成git。 

> chown -R git:git test.git