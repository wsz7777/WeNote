[TOC]

# let

## let的概念

- [let](#let)
    - [let的概念](#let%E7%9A%84%E6%A6%82%E5%BF%B5)
    - [let的特性](#let%E7%9A%84%E7%89%B9%E6%80%A7)
    - [let需要注意的地方](#let%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E7%9A%84%E5%9C%B0%E6%96%B9)
- [const](#const)
- [代码块概念](#%E4%BB%A3%E7%A0%81%E5%9D%97%E6%A6%82%E5%BF%B5)

## let的特性

`let`的特性将用与`var`相对比来一步步讲解：

1. 不存在变量提升：
```javascript
function b(){
    console.log(a);//undefind(不报错)，此处声明提前，导致声明了a，但未赋值。
    var a = 1;
    console.log(a);//1，在上面一条语句进行了对a的赋值，所以能输出1。
}
//上述语句执行时的情况为：
function b(){
    var a;
    console.log(a);
    a = 1;
    console.log(a);
}

//与var不同的的是：
function b() {
    console.log(a);//此处会报错，且函数执行结束，注释此行才能继续执行
    let a = 1;
    console.log(a);//注释第一次console.log(a)后此处输出1。
}
```
2. 暂时性死区：
```javascript
function c(){
    let a = 3;
    function b(){
        console.log(a);//此处报错。
        let a = 4
        console.log(a);
    }
}

function a(){
    typeof (a);//此处报错。
    let a ;
}
```
3. 不允许重复声明：
```javascript
function a(){
    let a = a;//如果写成var a = a，是能执行的，但这里会报错。
}
```

## let需要注意的地方

1. 特别适合for循环（用来循环的i变量不会泄露成全局变量）
```javascript
function c(){
    for(let i = 0,i<arr.lenght,i++){
        arr[i] = i;//i仅属于这个块级作用域，外部无法获取。
    }
    console.log(i)//此处报错。
}
```
2. let的存在使typeof不再是一个百分百安全的操作
```javascript
function a(){
    typeof (a);//此处报错。
    let a ;
}
```
# const
1. const用来声明只读常量,进行更改就会报错
```javascript
const PI = 3.24159;
PI = 3;//报错
```
2. const声明的常量无法更改，所以在声明的同时必须赋值
```javascript
const PI;//声明不赋值，调用也是调用了undefined
```
3. const声明不可更改，对简单数据类型是值不能改变，对于复杂数据类型是指向不能改变
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

</body>

</html>
<script>
    const foo = {};
    foo.a = 222;
    console.log(foo.a);//输出222
    foo.a = 333;
    console.log(foo.a);//输出333
    const fa = [];
    fa[0] = 1;
    console.log(fa[0]);//输出1
    fa[0] = 2;
    console.log(fa[0]);//输出2
    const str = "123123213";
    str = 123;//报错
</script>
```

# 代码块概念

