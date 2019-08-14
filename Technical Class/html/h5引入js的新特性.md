[TOC]

# h5中引入js文件的方式
## h5之前的引入方式
>在body末尾引入，原因无非以下两点
>
  1.  script 标签会阻止同步下载。在 HTTP 1.1协议里，浏览器对同一个域名不能有超过两个下载线程。所以为了早一步开始下载图片、样式等静态文件，通常都把这些文件放在不同的域名下，但唯独下载JS 文件时无论是否外部资源，都会阻止下载线程，只能尽量让引入外部 JS 文件的 script 标签往后排了。
  2.  JS 文件在下载时，浏览器的渲染会被阻止。因为JS文件可能会改变浏览器的渲染，浏览器还不如先等着 JS 加载完。网上有些说法说 JS 会阻止浏览器继续解析 HTML ，其实是不准确的。浏览器会一直解析 HTML 到最后，才不管 JS 是否加载完。
## script标签中新增的属性
在h5中新添加了很多标签及属性。在js的引入方式上也新增了属性—— **async** && **defer** 。
### async
``` html
<script async src="./test03-2.js"></script>
```

 此属性告诉浏览器，此脚本加载的时候，不会阻止浏览器停止渲染页面，只要此脚本下载完毕，就开始执行脚本。

### defer
``` html
<script defer src="./test03-1.js"></script>
```

 此属性告诉浏览器，脚本将在页面完成解析时执行。
```js
//执行时间与jQuery的下面这个方法类似。后面还会做测试进行比较。
$(document).ready(function(){ 
	//content;
});
```



### 注意
1.  这两个新属性需要在有src属性（引入js文件）时才生效
2.  含有defer、async属性的script标签放在head标签中

## 测试
1. 我们知道`window.onload=functino(){};`和`$(function(){});`前者在窗口加载完之后执行脚本，后者是在文档加载完（DOM元素加载完之后执行）。

2.  除src没有其他属性的script标签是按正常dom元素加载运行的。
3.  测试执行顺序。
### **Test Code 01**
#### test01 Code

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="./jquery-3.2.1.min.js"></script>
    <script defer src="./test03-1.js"></script>
    <script async src="./test03-2.js"></script>
    <title>Document</title>
</head>

<body>
    <!-- content -->
    <script>
        $(function() {
            console.log("jquery document ready");
        });
        window.onload = function() {
            console.log("window.onload");
        }
        console.log("in body");
    </script>
</body>

</html>
<script>
    console.log("out html");
</script>
```
#### test01 end

```
in body                 test03.html:17
out html                test03.html:29
defer                   test03-1.js:1
async                   test03-2.js:1
jquery document ready   test03.html:19
window.onload           test03.html:22  
```



从结果可以看出defer和async在整个文档运行完成之后运行，但是会先于`jquery ready`和`window.onload`这个方法。

### **Test Code 02**
#### test02 Code

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="./jquery-3.2.1.min.js"></script>
    <script defer src="./test03-1.js"></script>
    <script async src="./test03-2.js"></script>
    <title>Document</title>
</head>

<body>

    div{$$$}*100>a[href="#"]*10>span{我是第$$个}+p{我是第$$个span的注释}
    //上述简写语法生成代码并格式化行号为16-4315
    <!-- content -->
    
    <script>
        $(function() {
            console.log("jquery document ready");
        });
        window.onload = function() {
            console.log("window.onload");
        }
        console.log("in body");
    </script>
</body>

</html>
<script>
    console.log("out html");
</script>
```
#### test02 end
用简写语法生成3200个dom元素在body中，并测试。
测试结果如下：

```
async                   test03-2.js:1
in body                 test03.html:4326    (27+4299)
out html                test03.html:4332    (33+4299)
defer                   test03-1.js:1       
window.onload           test03.html:4324    (25+4299)
jquery document ready   test03.html:4321    (22+4299)
```

从结果上看async进行的test03-2.js在最开始执行。所以证明有async属性的外部文件是加载完之后立即执行的。再通过 test01 的测试async在html加载完之后执行所以证明他是个异步操作，script 标签不影响之后代码的加载和运行。



but这里有个小细节不知道你们发现了没有，我们运行的结果中`$(functino(){})`这个方法和`window.onload=function(){}`这两个方法的运行顺序。这个小问题我已经解决掉了，在后面的笔记中会有记载。