[TOC]

# let&const（进阶篇）

​	通过上一章的学习，我们了解了基础用法，今天我们来看一看更高级的用法吧，但是在这之前先搞清楚以下几个问题：

##Q&A（question & answer）

> let 和 const 的作用域相同吗？

​	是的 `let` 是块级作用域，`const` 同样也是块级作用域。

> const 有什么优势？

​	 `const` 定义过的变量不能被重复定义，避免重复定义以及赋值导致的坑。同样 `let` 也有这样的能力。我们可以看做是 `JS` 的一次自身进化。

> const 除了定义模块还能怎么用？

​	请看接下来的实践。

> let 除了像 var 一样正常的用法外，还能怎么玩？

​	请看接下来的实践。

## 应用进阶

### let

​	我们先来看看 `let` 还有什么玩法：

#### 基础

​	我们自定义一个作用域，然后里面用 `let` 定义：

```js

{
	let ca = {
		state: "ok",
		other: "go"
	}

	console.log(ca);	//	输出：{state: "ok",other: "go"}
}

console.log(ca);	//	报错：ca is not defined
```

​	这样在作用域外是无法访问作用域内的变量的。对于一些封闭的作用域或者单用的地方我们可以使用这个方法。

#### 进阶玩法

第一层：

​	比如绑定事件时，需要用到一个作为计数器的变量，而且我们还不想让这个计数器被其他事件访问，那我们怎么搞：

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}
        
		li {
			width: 20%;
			height: 60px;
			background-color: #ff6600;
			color: #ffffff;
			margin: 20px;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
        }
	</style>
</head>
<body>
	<ul class="list">
		<li>this is 01 classification</li>
		<li>this is 02 classification</li>
		<li>this is 03 classification</li>
		<li>this is 04 classification</li>
		<li>this is 05 classification</li>
		<li>this is 06 classification</li>
		<li>this is 07 classification</li>
		<li>this is 08 classification</li>
		<li>this is 09 classification</li>
		<li>this is 10 classification</li>
	</ul>
</body>
</html>
<script>
	"use strict";

	const li = document.getElementsByTagName('li'); 
  	
	//	我们在这里创建个块级作用域防止其他属性来访问此作用于中的timer变量；
  	{
		let timer = 0;

		li[0].addEventListener("click", () => {
			timer++;
			console.log(timer);
		});
    }
</script>
```



第二层：

​	我们来尝试给所有 `li` 绑定一个各自的累加器：

```js
for (let i = 0; i < li.length; i++) {

	let timer = 0;

	li[i].addEventListener("click", () => {
		timer++;
		alert(timer);
	});

}
```

​	用以上代码替换第一层中的自建作用域部分就OK。有兴趣的小伙伴可以想一下用 `var` 怎么实现。

### const

​	还是用上面的案例，用一下代码替换自建作用域部分：

```js
const arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]；

for (let i = 0; i < li.length; i++) {

	const ar = arr[i];

	li[i].addEventListener('click', () => {
		alert(ar);
	});

}
```

​	可以自己动手实践一下这个效果。这段函数证明了 `const` 的块级作用域。 `for` 循环重复定义一个变量 `ar` 如果 `const` 的作用域是全局的那么重复定义同一常量必定会报错，但是他正常运行了。而且我们在 `Chrome` 中去打断点的时候会发现他在描述 `let` 和 `const` 定义的量的时候是分开的两个 `block` 区域。
​	更高级的玩法暂时没看到，这篇先写这半章。