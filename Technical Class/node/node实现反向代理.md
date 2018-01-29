[TOC]

# node 做反向代理

​	有这么一个项目，我网厅端口布置为9001，手厅端口布置为9002，app服务端口布置为9003，而且各自的目录路径也各不相同，但是这三个服务都在同一个机器上，而我们要实现的是用户访问时不通过固定端口号的方式去访问，而是都通过 `8000` 端口进入，然后对请求判断，再然后把请求分发到各自端口号上。

## 前言（基础）

​	有人如果问我问什么不把这三个项目放在同一个目录下。。。请你关掉此页面，后面的内容可以不用看了（ps：这种问题你找需求，找产品，找技术总监架构师之类的去谈。具体情况要视需求定不是随便玩的）。

​	我们来说正题

- 先理解一下什么是反向代理，其实反向代理就做了上面说的事，在服务器内部重新分发请求；
- 我们需要用到的原生模块 `fs` 、 `http` ；
- 还需要一个帮助我们实现访问内部端口的三方模块 `http-proxy` （用 `npm` 下载，不会的话先学怎么使用 `npm` 包管理工具）；

## 代码部分 

```js
// [node反向代理玩法：]
const
	http = require("http"),
	fs = require("fs"),
	httpProxy = require('http-proxy'),
	// 此处路径为绝对路径
	pcRu = '/pc/',
	mobileRu = '/mobile/',
	appRu = '/app/';

let
	// 代理server
	proxy = httpProxy.createProxyServer({}),
    // 端口server
	serverStar = (rootUrl, port) => {
		http.createServer((request, response) => {
			let
				url = request.url,
				pathUrl = url.substr(url.indexOf('/', 1)),
				fileUrl = rootUrl + pathUrl,
				txt = fileUrl.slice(fileUrl.lastIndexOf('.') + 1);

			openHtml(response, fileUrl, txt);
		}).listen(port);
	},
	// 开启页面
	openHtml = (res, path, txtType) => {
		fs.readFile(path, (err, data) => {
			if (err) {
				res.writeHead(404, { "Content-Type": "text/html;" });
				res.end('404');
			} else {
				res.writeHead(200, { "Content-Type": "text/" + txtType + ";charset=\"utf-8\"" });
				res.write(data);
				res.end();
			}
		});
	},
    // 反向代理 server
    agentFrom = (port) => {
		http.createServer((req, res) => {
			let
				url = req.url,
				host = req.headers.host;

			// 在这里可以自定义你的路由分发  
			switch (host) {
				case 'pc.wsz7777.cn':
					proxy.web(req, res, { target: 'http://localhost:9001' });
					break;
				case 'mobile.wsz7777.cn':
					proxy.web(req, res, { target: 'http://localhost:9002' });
					break;
				case 'app.wsz7777.cn':
					proxy.web(req, res, { target: 'http://localhost:9003' });
					break;
				default:
					res.writeHead(200, { "Content-Type": "text/html;" });
					res.end('welcome, 你找的页面不存在，请重新输入地址');
			}
		}).listen(port);
	};

// 监听pc端服务端口
serverStar(pcRu, 9001);
// 监听移动端服务端口
serverStar(mobileRu, 9002);
//监听app服务端口
serverSter(appRu,9003)
// 开启反向代理
agentFrom(8000);

// 捕获异常  
proxy.on('error', (err, req, res) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Something went wrong. And we are reporting a custom error message.');
});
```

