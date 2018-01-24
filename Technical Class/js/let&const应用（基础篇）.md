[TOC]

# let&const（基础篇）

​	在 `es6` 出现之后给我们带来来了很有有意思的新东西，让我们开发更便捷更舒服的使用 `javascript` 这门万能的神奇语言。从定义变量这部分来看我们用到了 `let` && `const` 去代替 `var` 。为什么要使用新的定义方式呢，为什么不沿用 `var` 呢。`var` 到底有什么坑？来，我们花几分钟看一下他们的区别。

## let

### 使用 `var` 遇到的问题

​	关于 `let` 我们怎么使用呢？他和 `var` 有什么关系呢，来我们看一个最近遇到的问题：

> 写一个竖排的菜单，有十个分类，点击每个分类使其对应的分类详情出现。

​	我们来简化一下需求让他变得更直观一点：

> 写十个小块，点击每个小块可以输出自己的 `index` 值

化简后的需求代码如下：

html部分：

```html
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
```

js部分：

​	使用 `var` 编写

```js
const li = document.getElementsByTagName('li');

for (var i = 0; i < li.length; i++) {
	li[i].onclick = function() {
		console.log(i);
	}
}
```

​	这样乍一看没什么问题但是实际操作过的人就知道，点击每个小块输出的全是 `10` 而不是自己想使用的 `index` 值。

### 解决 `var` 的坑

#### 传统方法：

​	修改 `for` 循环中绑定事件部分：

```js
for (var i = 0; i < li.length; i++) {
	(function(i) {
		li[i].onclick = function() {
			console.log(i);
		}
	})(i);
}
```

​	在绑定事件的时候放在自执行函数里，并且把 `i` 传入其中。

#### 使用 `let` 解决：

```js
for (let i = 0; i < li.length; i++) {
	li[i].onclick = function() {
		console.log(i);
	}
}
```

​	对，你没看错，就这么简单。把这里的 `var` 替换成 `let` 大吉大利，晚上吃鸡~！

### 为什么有这个坑

​	如果你很熟悉 `var` 的作用域和绑定事件的执行位置，ok，我相信你已经知道答案了。如果你还不明白继续往下看：

​		`var` 的作用域是一个函数，也就是说在 `function funcName(){}` 的大括号才是 `var` 的作用域范围；而新的定义 `let` 呢，他的作用域范围是 `{}` 。这样 `for(){}` 每个单次循环就有了自己的一个作用域，虽然以前也有但是作用范围限定不如 `funciton` 那么严谨。所以在用传统方式解决的时候，我们在其中使用了自执行函数封闭作用域。而使用 `let` 就不用考虑这种奇怪的逻辑了。

​	绑定事件执行的时候他的作用域属于当前函数作用域， `var` 定义呢是定义在当前函数作用域，而 `for循环` 在事件执行时已经执行完了那么当绑定事件执行的时候当前函数作用域的 `i` 已经是 `10` 了。而使用 `let` 定义时 `i` 的作用域为单次 `for` 循环的范围，不是当前作用域。

## const

​	说到 `const` 那了解过基础语法的小伙伴，那肯定知道他是在定义一个常量。但是最近我对 `const` 微微深入了解了一下，发现了个有趣的东西：常量并不是全部不可变。

> `const` 定义的变量：
>
> 1. 变量名不可被重复使用；
> 2. 只能在定义时赋值，不可以在下文继续赋值；
> 3. 定义数组，对象时，其中的名值对可增改；

​	刚才眼尖的小伙伴已经看到我在上面定义常量并把 `dom` 元素赋给他 ，其实 `dom元素` 就是一个对象。我去改变他的名值对中的值，使用对象中的方法都没有问题。那么用 `const` 定义有什么好处？防止变量重新被定义、赋值等操作，为程序带来不可预估的风险。

### 实际应用

​	那么有小伙伴这里就会有疑问，我用 `const` 定义 `dom` 元素拿到的元素是实时的吗？（在 `input` 操作上这点尤为明显，例如拿到的是不是当前的 `value` 值）。

`html` 代码：

```html
<input type="text" name="" id="inp" value="test">
```

`js` 代码：

```js
const inp = document.getElementById('inp');
inp.onblur = function() {
	console.log(inp.value);
}
```

可自行试试输出值是否为当前值还是定义值，经过测试没问题，输出为当前值。

​	我们实际应用中可以使用 `const` 定义对象啦，数组啦，DOM元素啦什么的。

## 小结

由本篇可知：

1. `var` 
   1. 的作用域特别混乱；
   2. 作用域范围只能靠函数强制限定；
2. `let`
   1. 块级作用域；
   2. 作用域范围靠 `{}`  限定；
   3. 随时使用随时定义（这样并不是说就没有规范）
      1. 使用定义时必须提在当前作用域的最前；
      2. 定义时必须做赋值，如果无法立即赋具体值，请赋值为 `null`；
3. `const`
   1. 定义时必须赋值；
   2. 不能对其变量名进行二次赋值；
   3. 定义五种基础数据类型时，其值不可变；
   4. 定义复杂数据类型时，值可变；
   5. 定义复杂类型时，可用其自有方法进行对自身改变。