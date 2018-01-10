[TOC]

# git中的分支使用

## 为啥使用分支
​	first git 中的分支创建时很简便的，除了增加一个指针以及改变`HEAD`的指向，工作区文件没有任何变化。而后工作区的`add`、`commit`这些方式只针对创建的这个分支了。最后在完成工作后把我们新建立的分支合并至`master`上就OK了。

​	最重要的一点，git最强大的地方就在这个分支的使用上，处理bug、开发新功能、测试统统用分支，最后一切ok变个指向就大功告成。避免大家提交代码的各种冲突。

## 来看看使用

### 创建分支

```shell
# 创建 dev 分支
git checkout -b dev
Switched to a new branch 'dev'

# 带参数-b相当于一下两条命令
git branch dev
git checkout dev

# 用下面命令查看当前状态

git status
On branch dev
nothing to commit, working tree clean

git branch
* dev
  master

```

### 提交代码即合并分支

```shell
#　提交

```

