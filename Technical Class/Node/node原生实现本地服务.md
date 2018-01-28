[TOC]

# 使用node开启本地服务器

​	今天要使用 `node` 开启一个以及多个本地服务。相信在做的前端的小伙伴一定会遇到这样的一些问题，例如调试  `Ajax` ，例如测试在服务器上加载页面效果调试程序，以及诸多问题。那么解决这种问题的办法很简单——部署一个简单的服务。

​	而我们在以前的学习过程中，玩过各种各样的本地服务器，什么 `Apache`  开启的，什么用 `WebStrom`  或者 `HBuilder` 这种重型 `IDE` 开启的，说实话，都弱爆了。一个自己随手写的2、3十行的 `node` 程序就能解决的问题，就不要用那些老家伙了，我们要追随时代的脚步让 `node`  发扬光大才是正解~好了废话不多说来看看怎么写：

## 前言

​	现在市面上的各种打包工具都实现了这个功能，而且他们做的更完善，还有什么模块热加载等等牛逼哄哄的效果。在此我只是想证明  `node`  很强大，我们实现这个功能的程序很简单。并且我们是再用原生的方式去写，不会用到框架，这只是探索原理。当然个人觉得问题不是很大的话，拿去做简单的测试服务器还是可以的。生产中使用的逻辑上应当比下面的代码更严谨一些。

## 搞懂一些基础

- 本地服务器的原理：说白了就是监听端口，把一个服务代理至至一个文件夹；
- 怎么使生产与本地服务器不受同源策略限制：自己百度搜怎么修改 `host` 文件即可；
- 本地服务器做了什么：读取文件，把文件导出；
- 绝对路径与相对路径：对部署静态资源的服务器来讲绝对路径更快捷一些；

！！！准备好 `node`  环境哦~

## 上干货 

上干货前简单说明一些配置

> 1. 我的要开启本地服务的文件夹路径如下  `/Volumes/jacky/web-sd/nodeStudy/day01/html` ；
> 2. 要监听的端口为 `7000` ；
> 3. 我们需要用到的是原生  `node`  的模块为： `http` 网络模块以及  `fs`  文件模块；
> 4. 这个 `js` 文件可以放在任何地方，只要用 `node` 指令去执行它就ok；
> 5. 文件名随便起 本次示例文件名为 `app.js` 。

```js
const
	http = require("http"),
	fs = require("fs"),
	dru = '/Volumes/jacky/web-sd/nodeStudy/day01/html';

http.createServer((request, response) => {	// 创建一个http的Server

	let
		Url = request.url,	// 获取端口号后面的路径
		fileUrl = dru + Url,	// 进行绝对路径拼接
		txtType = fileUrl.slice(fileUrl.lastIndexOf('.') + 1);	// 获取文件类型
  
	fs.readFile(fileUrl, (err, data) => {	// 读取文件 传入路径参数 和 回调函数

		if (err) {	// 遇到错误返回404页面
			response.writeHead(404, { 
				"Content-Type": "text/html;charset=\"utf-8\"" 
			});
			response.end('404');	// 页面输出404
		} else {	// 返回正常
			response.writeHead(200, { 
				"Content-Type": "text/" + txtType + ";charset=\"utf-8\"" 
				// 确定文件的解析方式 以及 编码格式
			});
			response.write(data);	// 导出文件内容
			response.end();		//结束处理
		}

	});

}).listen(7000);	// 设定监听端口
```

切换到控制台：

```shell
# 执行：
node app.js
# 退出进程按两次 ctrl + c

# 如果想把该进程移到后台执行 如下：
node app.js &
```



​	代码31行去除空行24行。就这么24行使就开启了一个简单的本地服务器。就这么 `easy` 。
