[TOC]

# Use SVN

​	实际工作中，很多公司使用的代码版本控制工具并不是 `git` 而是 `svn` 。为什么会使用 `svn` 为什么呢？这个我找过一些人讨论过这个问题，大概分以下几种情况：

- 项目比较老，而且认定  `svn` 更稳定一些；
- `git` 比 `svn` 自由，自由就意味着冲突的增加，也就是开发成本的增加；
- 一直再沿用团队比较熟悉的技术栈。

##　为什么有这篇　use SVN

​	我们项目比较老，而且一直在用 `svn` 来作为团队的代码管控工具，而且新人比较多，也就是实习生比较多。学习并熟悉 `git` 要花费额外的时间。基本上上三条都沾~我也很无语，最重要的是我的 `svn` 软件出了问题没办法好好撸代码了。

## 基础

​	 `svn` 只有本地仓库和远程仓库之分，没有 `git` 中的 `工作区` 和 `暂存区` 这两个概念。你可以看作 `svn` 是 `git` 的化简版，把 `git` 中的 `工作区` 、 `暂存区` 和 `本地仓库` 合并为一个——  `本地仓库` 。操作比 `git` 简化很多，具体情况往下看吧~

```bash
# 示例：
[可选参数] 
<参数作用>
```



### 1. 拉取项目代码

​	这步和 `git` 上有一点小区别~可以以用户名密码的方式直接拉取，操作命令是 `checkout` ，而且不需要指明分支名称。这让我感觉起来像是每一次拉取都是创建一个副本，你提交的时候并不是在操作主代码而是在副本中操作。所有人共用的是同一个版本的代码无法自己创建分支，类似于在 `git` 中仅使用 `master` 分支开发的状况。而 `git` 是所有人手中的都是这个项目的一部分，所有人的代码合起来才是这个项目的完整版，但是单个分开也是可以正常运行的。从结构上来讲 `git` 更符合分工合作的概念。

```bash
svn checkout <项目代码仓库的路径> [--username=<用户名>] [--password=<密码>]
# 简写
svn co <地址> --username=<用户名> --password=<密码>
```

### 2. 添加文件

​	你写完代码保存后这时候如果你这个文件夹（或者文件）不是新建的状态那就不需要添加文件至本地仓库也就是 `git add —all` 这步操作，直接 `commit` 即可。

```bash
svn add <文件名>
# 有新添加文件的情况建议使用以下命令比较快速完成所有文件的添加
svn add *
```

​	如果没有新建文件的话使用这行命令会报错，以下是报错信息：

> svn: warning: W150002: '此处为文件目录' is already under version control
> svn: E200009: Could not add all targets because some targets are already versioned
> svn: E200009: Illegal target for the requested operation

### 3. 提交文件

```bash
svn commit -m "提交信息" <提交文件名>
# 注意提交信息要超过十个字符
# 简写(提交所有文件)
svn ci -m "message to update this file" *
# cd到一个子目录下使用此命令：只提交当前文件夹下的所有文件
```

### 4. 查看日志

```bash
svn log		# 查看文件夹日志
svn log [文件名]	# 查看文件日志
```

### 5. 更新

```bash
svn update
# 简写
svn up
```

### 6. 查看本地仓库状态

```bash
svn status
# 简写
svn st
```

### 7. 删除文件

```bash
svn delete <文件名/文件夹名>
```

### 8. 撤销命令

```bash
svn revert <文件名/文件夹名>
```

## 处理问题

### 更改svn仓库地址
```bash
svn switch --relocate [原地址] [目标地址]
```

### 产生冲突

​	先更新（`update`）再提交（`commit`）。 `git` 中也同样先 `pull` 再 `push` 。

```bash
Select: (p) postpone, (df) diff-full, (e) edit,
        (mc) mine-conflict, (tc) theirs-conflict,
        (s) show all options:
# 解析:
# (p) postpone 把服务器代码和自己的代码都显示出来，供我们解决
# (df) diff-full 命令行显示冲突内容，不好看
# (e) edit 修改，不要这么做
# (mc) mine-conflict 只使用自己的代码，删除服务器的
# (tc) theirs-conflict 只使用服务器的，删除自己的代码
# (s) show all options 再重新打印一下这个选择日志
# 注意：选择 p 之后会多几个文件
# 1.m      多了 1.m.mine   1.m.r8     1.m.r9
# 1.m.r8 ：版本是8的时候的文件内容
# 1.m.r9 ：版本是9的时候的文件内容
# 1.m.mine ：当前自己文件的内容
```

解决：

```bash
# 打开1.m文件，根据冲突内容进行修改即可.
# 重点 ： 一定要删除这几行 
<<<<<<< .mine
=======
>>>>>>> .r9

<<<<<<< .mine # 自己本地文件中的内容
//修改了第1行
//第二行
=======  # 分割线:下边的是服务器上的内容
//修改了第1行
//第2行
>>>>>>> .r9
```

## 小结

​	总结一下命令吧，其他的东西比 `git` 简单很多。

- 拉取     `svn co <地址> [—username=***] [—password=***]`
- 添加     `svn add *`
- 提交     `svn ci -m "message" *`
- 更新     `svn up`
- 日志     `svn log [fileName]`
- 状态     `svn st`
- 删除     `svn delete <fileName>`
- 撤销     `svn revert <fileName>`
- 更换地址  `svn switch --relocate [原地址] [目标地址]`
- 冲突状态：先更新再解决~
