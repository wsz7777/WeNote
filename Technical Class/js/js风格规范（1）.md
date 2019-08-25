[TOC]

# js风格规范（1）



## 一般书写规范

- 每条语句以`;`结束

- 运算符前后要有空格

  - ```javascript
    var a = 100;

    a += b;

    ```

  - ```javascript
    if(i < 100){
    	// content
    }
    ```

- 函数内容或是在`{}`中换行统一空四个空格长度

  - ```javascript
    function func(){
    1234var a = 'a';
        document.getElemtById('div');//内容要对齐
    }
    ```

  ​



## 定义变量

### 定义变量时赋值

如果变量定义的时候要赋初始值，example：

```javascript
var a = null;
console.log(a);    //输出null
```

如果只是写

```javascript
var a;
console.log(a);    //输出undefined
```

如果直接不定义`a`直接`console.log(a)`时输出和第二种情况相同

直接代码说明，如下：

```html
<script>
  
	console.log(a);    //输出undefined
	
  	var a;
	console.log(a);    //输出undefined
	
  	var a = null;
	console.log(a);    //输出null
</script>
```

三次输出`a`，注意：第一次输出时没有定义`a`，第二次输出时是定义了`a`的，那这两次输出`a`的值是相同的。在实际开发中你用`console.log()`去调试的时候或者检查其状态的时候用`var a`的写法会造成你根本不知道这个变量值是否存在（是否定义过），而你用`var a = null`的写法在调试中你看到输出结果就很清楚这个变量`a`是否被定义过。

### 定义多个变量

初学者很常见的写法：

```javascript
var a = 'a';
var b = 'b';
var c = 'c';
```

这个写法没有错，完全符合`js`定义，但是不推荐这种写法。应为他的效率低，反复启用`var`定义方式。那么我们怎么写呢：

```javascript
var a = 'a',
    b = 'b',
    c = 'c';
```

这样`var`定义方式启用一次，把变量统一定义并且进行赋值。