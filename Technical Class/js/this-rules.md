[toc]

# this rules

## 默认绑定

​	默认规则的绑定，eg：

```js
function fun (){
	console.log('where is arrow this', this)
}

fun()
```

​	在非严格模式下，会输出全局对象，在严格模式下会输出`undefined`。

## 隐式绑定

​	我们对这个函数构造一个对象的环境，再来调用，eg：

```js
function fun (){
	console.log('where is arrow this', this)
}

var obj = {
  foo: fun
}

obj.foo()
```

​	此处调用后输出 `obj` 原因是调用fun函数时是通过`obj`来调用的。说到这里个人认为隐式绑定和默认规则非常像，甚至就是一条规则。在默认绑定的规则里，fun函数定义在全局，在浏览器环境中实质上是对window对象上挂载了一个 `window.fun` 的属性，在调用这个方法时是因为调用了 `window.fun()` 。这个全局定义的函数在其他运行环境里和浏览器里不太一样。此处可以理解为在**浏览器**环境的**非严格**模式下默认绑定等同于隐式绑定，但是脱离了这个环境，就要看具体环境的实际情况了

## 显示绑定

​	显示绑定顾名思义，是我们在代码中写明`this`的指向。我们有三个函数来实现，他们分别是`bind`、`call`、`apply` 。不同的是，`bind` 只是指明了`this`指向，其执行结果是返回一个函数。`call`和`apply` 的返回结果是这个需要绑定`this`指向函数的运行结果。`call`和`apply` 的区别只是传参方式不一样。

## new绑定

​	`new`绑定是把当前这个函数作为构造函数，进行执行。`new`操作的时候会生成一个新的对象，构造函数内的`this` 会指向这个新对象。