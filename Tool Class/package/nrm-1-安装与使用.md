[TOC]

# NRM

​	这是什么呢？`nrm` 是一个NPM仓库的镜像源管理工具包，可以去切换各中NPM仓库的镜像源。嗯~淘宝镜像用的不爽了，换一个ㄟ( ▔, ▔ )ㄏ；国内的用的不带用了，换国外的\(^o^)/~；统统不想用了，换自己的^_^。。。简而言之有了这个东西一行命令搞定镜像切换，麻麻再也不用担心我的源~

## install nrm

```bash
$ npm install nrm -g
```

注意要安装到全局哦，使用NVM管理Node的小伙伴需要在不同版本的Node环境中安装这个工具咯（至于为什么辣么麻烦。。。请移步nvm使用一文）。

## use nrm

​	我们先说基础使用：

```bash
$ nrm ls	# 列出所有镜像源
$ nrm use <name>	# 使用哪一个镜像源
```

![nrmUse](../images/nrmUse.png)

更换一下使用镜像源，然后我们来列出镜像列表查看一下：

![nrmUse-2](../images/nrmUse-2.png)

前面标记带 `*` 的为正在使用中的镜像。还可以使用 `nrm current` 命令查看当前使用的镜像源名称。

## yourSelf

​	使用你自己的镜像源地址，在操作上讲会出现新增（add）以及删除（del）。那我们来看一下怎么来执行这两个操作：

```bash
// 新增 (首页url是指此镜像服务的首页url)
$ nrm add <镜像名> <url> [首页url]
// 删除
$ nrm del <镜像名>
```

![nrmUseAdd](../images/nrmUseAdd.png)

注：此例以百度首页举个例子，实际服务不可用！

红线为实际提供服务的url，黄线为服务的首页url 勿混淆，黄线部分可不加。在列表最后看到有自定义添加的地址为添加成功。同时我们还可以通过 `nrm test <镜像名>` 的方式测试该地址的响应延迟。

删除刚才新添加的自定义镜像的方式为 `nrm del new` 即可

## other

​	接下来会说写奇奇怪怪的东西：打开镜像服务的首页

```bash
$ nrm home <name> [browser]
```

自行体验~~~

## 小结

```
nrm
	ls    // 列出当前所有镜像源
	current    // 查看当前镜像源的名称
	use <name>    // 使用某个镜像源
	add <name> <url> [home-url]    // 添加自定义镜像源
	del <name>    // 删除已有的某个镜像源
	home <name> [browser]    // 打开某镜像源的服务首页
	test [name]    // 检查响应延时 默认为当前使用源
	help    // 查看帮助 缩写：-h
	-V    // 查看版本
```

