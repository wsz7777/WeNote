[TOC]

### NodeJS+MongoDB快速搭建Web项目

#### 一、写在前面

​        人人都想成为全栈码农，作为一个web前端开发人员，通往全栈的简洁之路，貌似就是node.js了。前段时间

学习了node.js，来谈谈新手如何快速的搭建自己的web服务，开启全栈之路。

#### 二、安装nodejs

​        Node.js安装包及源码下载地址为：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)。大家根据自己的“吃饭”的工具择（我

自己是windows的，买不起mac啊）。这里就不多说了。默认安装在C:\Program Files\nodejs文件下，并将该目

录添加PATH环境变量。具体做法，  右击”我的电脑“-”属性“-“系统高级”-”高级“-”环境变量“-选择“变量名：

PATH”；“改变量值：  

在最后面添加【C:\Program Files\nodejs】（根据自己的安装目录而定）”。

打开cmd直接运行命令：

```shell
node -v
```

显示：  

​	![](https://ws1.sinaimg.cn/large/005GmWtAly1fnrlveja8zj30a803fa9v.jpg)  

则表示nodejs安装成功。

+ NPM

说明：npm（node package manager）是nodejs的包管理器，用于node插件管理（包括安装、卸

载、管理依赖等）

使用npm安装插件：命令提示符执行  `npm install <name> [-g] [--save-dev]`  

`<name>`: node插件名称。

`-g`:   全局安装。

​ 将会安装在C:\Users\Administrator\AppData\Roaming\npm，并且写入系统环境变量； 非全局安装：将会安装

在当前定位目录； 全局安装可以通过命令行在任何地方调用它，本地安装将安装在定位目录的 `node_modules`

 文件夹下，通过 `require()` 调用；

`-save`:    将保存配置信息至package.json（package.json是nodejs项目配置文件）；

`-dev`:    保存至package.json的devDependencies节点，不指定-dev将保存至dependencies节点；

+ CNPM

说明：因为npm安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果npm的服务器在中国就好

了，所以我们乐于分享的淘宝团队干了这事。来自官网：“这是一个完整 npmjs.org 镜像，你可以用此代替官方版

本  (只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。”  

安装：命令提示符执行`npm install cnpm -g --registry=https://registry.npm.taobao.org` 

  > 注：cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm。
#### 三、使用express框架搭建项目

​          忙活了一阵，终于可用npm命令进行初始化、安装express框架，然后写个hello world 爽一下了。为什么要

选择express框架了，当然有它的特别之处，对新手来说最怕的就是麻烦还容易出错。express当然为我们考虑到

了，所以提供了快速生成器：express-generator

> 1. 通过命令：npm install express-generator -g 安装到全局
> 2. 在用express 命令生成项目结构，express myapp 其中的myapp是你的项目名称
> 3. 通过cd myapp 进入项目文件中
>    1. 通过npm install 初始化依赖模块
>    2. 通过set DEBUG=myapp & npm start 启动web服务器
> 4. 在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了。
> 5. 默认情况下用的模版引擎是jade，项目里也已经配置好了这个模版。    

myapp的项目结构如下：

​		![](https://ws1.sinaimg.cn/large/005GmWtAly1fnrr2r6gpxj307o0a6glq.jpg)
- package.json 这个可以说是模块管理包，项目信息和模块的版本号，其实你会发现在项目模块初始化的时候

  就是由这里的配置去查找生成的。

- app.js 是项目的启动文件，可以说是项目的核心。主要写一些公共的功能。

- bin 文件下有个无后缀的www文件，这是项目的入口文件，配置web服务端口和一些监听事件。

- node_modules是项目的依赖的的文件模块，之后导入的包也会被放在其中，比如连接数据库的  

  mongoose模块，后面会详细讲。

- public 是项目的静态资源文件集，很容易看出图片、css文件、js文件都放在这里。

- routes 是项目的路由模块，其中已经默认了index.js和user.js文件。在这里其实也包括一般后台语言中的控制

  器内容，当然在大的项目上是可以分离开来的。

- views是项目的模版文件，是jade模版引擎，这个模版很简洁，但是坑也比较多，比如对空格的要求都非常严

  格，多一个少一个空格都会报错的，曾经踩过很多坑，其实它的性能也不是很高还不如用ejs呢。 

#### 四、安装mongoDB

1.  同样在官网([http://www.mongodb.org/downloads](http://www.mongodb.org/downloads)) 上直接下载msi文件。
2.  简单的下一步进行安装(我的在d盘安装的)，有默认的就让其默认，有选择的就全选了。
3.  然后配置环境变量，和node的一样不再累述。
4.  接下来在mongodb文件夹中创建一个 data 文件夹，再在 data 文件夹中创建 db 文件夹，打开CMD命令行
```shell
d:
cd mongodb\bin
mongod -dbpath D:\mongodb\data\db
```

5. 在打开一个CMD命令行：

```shell
d:
cd mongodb\bin
mongo
```

6. 这就可以用了。这边会很麻烦，每次用命令打开服务。我们只需要使用以下命令将MongoDB安装成为 

   Windows服务：

```shell
cd mongodb\bin
mongod --logpath "D:\mongodb\data\logs.txt" --logappend --dbpath "D:\mongodb\data" --directoryperdb --serviceName "MongoDB" --serviceDisplayName "MongoDB" --install
# 控制台会输出：
		Creating service MongoDB.
		Service creation successful.
		Service can be started from the command line via 'net start "MongoDB"'.
# Windows服务的名称：MongoDB；		
```

以后我们启动服务： `net start MongoDB`

停止服务： `net stop MongoDB`
> 注：  使用此命令启动服务，`cmd`  必须为管理员模式打开，否则提示拒绝访问

#### 五、数据库设计及项目关联

​      在刚才的打开的mongodb数据库中输入：

> use mydb        \创建一个叫chihuo的数据库
> db.createCollection(“users”)     \创建一个集合
> db.users.insert({“name”:“root”,“password”:“root”})     \给users集合添加一个文档
> db.users.find()      \查询你添加的文档   

再接着就是在项目中连接刚才创建的数据库了

在项目根目录下创建一个的文件夹 database ，然后在创建一个db.js，mongoose模块大家可能要安装一下

```shell
cd myapp
npm install mongoose
```

db.js：

````js
var mongoose = require('mongoose');			
var db = mongoose.connect('mongodb://localhost/chihuo');//；连接数据库
var Schema = mongoose.Schema;   //  创建模型
var userScheMa = new Schema({
	name: String,
	password: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联
exports.user = db.model('users', userScheMa); //  与users集合关联
````
接着在views文件夹创建视图文件了
> 1. 我们上面用express创建的项目视图文件是ejs后缀名，我们一般习惯使用html后缀名。那么我们 怎么让他识别html的视图文件呢？
> 2. 在app.js文件中 找到app.set('view engine', 'ejs');    
>   将他替换为app.set( 'view engine', 'html' );
> 3. 再用app.engine()方法注册模板引擎的后缀名。
>   app.engine('.html',require('ejs').__express);//两个下划线。

然后我们创建一个login.html(登陆页面),index.html(原来有，改一下后缀名就行)，ucenter(登陆之后的页面)。
````html
<!--login.html-->
<!DOCTYPE html>
<html>
  <head>
	<title>my login</title>
	<link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
	<h1>Hello World</h1>
	<p>Welcome to</p>
	<form action="ucenter" method="post">
		<p>
			<span>name:</span>
			<br>
			<input id="name" name="name" type="text">
		</p>
		<p>
			<span>password:</span>
			<br>
			<input id="password" name="password" type="password">
		</p>
		<p><input type="submit" value="submit"></p>
	</form>
  </body>
</html>
````
````html
<!--index.html-->
<!DOCTYPE html>
<html>
  <head>
	<title>my index</title>
	<link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
	<h1>Hello World</h1>
	<p>Welcome to</p>
	<p><a href="login">登陆</a></p>
  </body>
</html>
````

````html
<!--ucenter.html-->
<!DOCTYPE html>
<html>
  <head>
	<title>my ucenter</title>
	<link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
	<h1>Hello World</h1>
	<p>你已经成功登陆</p>
  </body>
</html>
````
最后就是路由的控制了，在routes文件中的index.js

````js
var express = require('express');
var router = express.Router();
var user = require('../database/db').user;


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'index' });
});

/* login */
router.get('/login', function(req, res) {
	res.render('login', { title: 'login' });
});

/* ucenter */
router.post('/ucenter', function(req, res) {
	var query = {name: req.body.name, password: req.body.password};
	(function(){
		//count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
		user.count(query, function(err, doc){
			if(doc == 1){
				console.log(query.name + ": 登陆成功 " + new Date());
				res.render('ucenter', { title:'ucenter' });
			}else{
				console.log(query.name + ": 登陆失败 " + new Date());
				res.redirect('/');
			}
		});
	})(query);
});
  
module.exports = router;
````

#### 六、启动项目
```shell
d:
cd myapp
npm start
# 浏览器输入：http://localhost:3000/
```

显示：

​           ![](https://ws1.sinaimg.cn/large/005GmWtAly1fnrtceeu7dj306l06na9w.jpg)

点击登录：

​		![](https://ws1.sinaimg.cn/large/005GmWtAly1fnslude158j307g08q3ye.jpg)


输入账号和密码，点击submit

   ![](https://ws1.sinaimg.cn/large/005GmWtAly1fnrtk2ukkzj307a06oglg.jpg)

大工告成！！！！