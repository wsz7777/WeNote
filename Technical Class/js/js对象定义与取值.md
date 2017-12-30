[TOC]

# js的对象

## 对象定义

`new Object()`这是通用的定义方式`java`中可以这么写，从`java`继承部分特性的`js`里自然也可以这么写，不过在`js`中这样写的执行效率很低。

```javascript
var obja = new Object();	//效率低 这种定义方式会执行对象初始化，然后进行赋值
var objb = {};		//效率高 快速定义方式，这种定义方式直接对其赋值，省去对象初始化步骤
```



## 对象取值

```javascript
// 先定义一个对象
var obj = {
    	name: 'wsz',
      	age: 22,
      	sex: 'man',
      	read: function(book){
          	book.open();
          	if(book.isFun){
           		alert('哈哈哈');
          	}else{
              	console.log("I'm reading");
          	}
    	}
  	};

// 现在这里测试取值
//   直接取值
console.log(obj.name);	//输出 字符串：wsz

//	遍历取值
for(var i in obj){
	console.log(i + ':');	// 输出属性名称    即 “键值对” 中的 “键”
  	// 第一种取值方式 和直接取值的方式相同用“.”作为对象和属性的连接
  	console.log(obj.i);	//输出 undefined
  	// 第二种取值方式 用"[]"包裹属性的方式读取
  	console.log(obj[i]); //输出 属性值
}
```

解析：为什么遍历取值的第一种取值方式取不到属性值？原因很简单，`for in`循环中`i`是一个变量，获取的是对象的属性名称，也就是说包含的值的类型为字符串类型我们用这种取值方式当`i = 'name'`的时候 我们以为输出`obj.name` 但实际上执行的代码为`obj."name"`。这样肯定是取不到啦，那第二种取值方式执行的是`obj["name"]`等价于`obj.name`自然拿到值了。