[TOC]



# html

​	超文本标记语言，就是直观的翻译，`html`做的事情很简单，给文档加上各种标记，便于`css`去添加样式以及`js`去操作。如果有什么特别的亮点的就只能靠浏览器厂商以及`html`的管理组织`w3c`去对他扩充方法咯。

​	但是即便这样，html也是有性能之分的，例如过多的标签嵌套无论对于浏览器解析`html`还是`js`操作它都是一个很浪费性能的方式。而且不易阅读和修改。

## 初级

`xml`、`html 4`、`html 4.01`。熟悉运用掌握各种标签。

- 块级元素
- 行内元素（内联元素）
- 行内快元素

## 进阶

`html 5`熟悉新的语义化标签以及其特性。

## Emmet语法

​	快速书写 `html` 的超强工具目前在 `VsCode` 中是无配置支持，在其他编辑器中可能会用到插件。写完 `Emmet` 记得按 `tab` 键生成你想要的结果。

### 1.完成标签
输入 `div`  
```Html
<div></div>
```

### 2.完成更多标签


1-生成相邻元素：`+`
`div+div` 生成：

```html
<div></div>
<div></div>
```

2-生成子节点：`>`
`ul>li` 生成：

```html
<ul>
	<li></li>
</ul>
```

3-生成上级元素：`^`
`ul>li^div` 生成：

```html
<ul>
	<li></li>
</ul>
<div></div>
```

4-生成重复元素：`*`
`div*5` 生成：

```html
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

​	注：尝试一下`ul>li*5`的结果

5-分组生成：`()`
`div>(div>a)+(ul>li*3)` 生成：

```html
<div>
	<div><a href=""></a></div>
    <ul>
    	<li></li>
        <li></li>
        <li></li>
	</ul>
</div>
```

`div>(div>a)+(ul>li)*3` 生成：
```html
<div>
    <div><a href=""></a></div>
    <ul>
        <li></li>
    </ul>
    <ul>
        <li></li>
    </ul>
    <ul>
        <li></li>
    </ul>
</div>
```


### 3.完成class、id、属性


1-class
	`div.box` 生成：

```Html
<div class="box"></div>
```

2-id
	`div#app` 生成：

```html
<div id="app"></div>
```

注：在使用简写方式时会有惊喜

```Html
.box => <div class="box"></div>
app => <div id="app"></div>
ul>.li  =>
	<ul>
		<li class="li"></li>
	</ul>
a>.cont => <a href=""><span class="cont"></span></a>`
```

3-属性

```Html
a[href="javascript:;"] => <a href="javascript:;"></a>
a[data-info="sss"] => <a href="" data-info="sss"></a>
```


### 4.完成内容


1-内容 `{}`
`div{this is div}` ：

```html
<div>this is div</div>
```

2-递增 `$`
`ul>li.item$*5` ：

```html
<ul>
	<li class="item1"></li>
	<li class="item2"></li>
	<li class="item3"></li>
	<li class="item4"></li>
	<li class="item5"></li>
</ul>
```

3-多位递增 `$$$`
`ul>li.item*5{$$$}` ：

```html
<ul>
	<li class="item">001</li>
	<li class="item">002</li>
	<li class="item">003</li>
	<li class="item">004</li>
	<li class="item">005</li>
</ul>
```

> 注：$个数自定

4-递减 `$@-`
`ul>li.item$@-*5` ：

```Html
<ul>
	<li class="item5"></li>
	<li class="item4"></li>
	<li class="item3"></li>
	<li class="item2"></li>
	<li class="item1"></li>
</ul>
```

5-特定数字递增 `$@N`
`ul>li.item$@10*5` ：
```html
<ul>
	<li class="item10"></li>
	<li class="item11"></li>
	<li class="item12"></li>
	<li class="item13"></li>
	<li class="item14"></li>
</ul>
```

6-倒序递减 `$@-N`
`ul>li.item$@-10*5` ：
```html
<ul>
	<li class="item14"></li>
	<li class="item13"></li>
	<li class="item12"></li>
	<li class="item11"></li>
	<li class="item10"></li>
</ul>
```



