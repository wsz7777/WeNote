[TOC]

# git 参与项目

​	用 `git` 是来协作一起开发项目的，所以这里直接写流程不加赘述了

注：项目均以`WeNote`做示例。

## 流程

- 从`远程仓库` `clone`至`本地仓库`（或者`pull`到`工作区`）
- 修改`user.name`和`user.email`
- 然后添加、修改代码
- 从`工作区`保存更改至`暂存区`
- 从`暂存区`提交至`本地仓库`
- 从`本地仓库`上传至`远程仓库`



## 操作

参照流程一一对应

```

git clone git@gitee.com:wsz7777/WeNote.git
cd WeNote	// 进入到WeNote目录下 或者用vscode新建窗口打开

git config user.name "your userName"
git config user.email "your userEmail"
# 我的信息如下：
#	userName  是 jacky
#	userEmail 是 862554643@qq.com
# 这个命令为：
#	git config user.name "jacky"
#	git config user.email "862554643@qq.com"

### 修改/添加文件

git add --all

git commit -m"update message"

git remote	// 查看远程仓库名称

git push gitee master
# git push [仓库名称] [分支名称]

git push origin master
# git push [仓库名称] [分支名称]

# 更新工作区文件
git pull origin master
# git pull [仓库名称] [分支名称]
# master 为默认主分支
```

