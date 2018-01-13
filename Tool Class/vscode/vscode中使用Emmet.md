[TOC]

# Emmet

## 简介

​	加速`html,css,xml`开发的工具类语法。他的目的是让我们写`html,css,xml`更快、更便捷。原理很简单通过一些简单的标记配合自动生成从而使我们的开发更迅速。之所以说是语法是应为有迹可循，如果是无迹可寻的标记，那我们也不会称之为语法了。在这篇文章里我不会大篇幅的讲述什么具体的标记，我觉得掌握核心就抓住了这个理念的所有。

​	在vscode中或是其他支持Emmet语法的编辑器中使用Emmet，只需输完Emmet语法的字符串后打一个`tab`键，自动生成。在vscode中更好的配置请参照[vsCode的智障提示](http://www.gitee.com/wsz7777/WeNote/Tool Class/vscode/vsCode的智障提示.md)

## 规则

​	我们分两个部分说，`html,xml`合并在一起说，因为两种标记语言的原理极度相似生成规则也可以说没什么区别；另一部分为`css`。

### html && xml

​	这个部分会多一点规则叙述，标记语言自然规则比较统一。

#### 基础规则

##### 选择器嵌套

```html
div		=>	<div></div>
div*3	=>	
			<div></div>
			<div></div>
			<div></div>
div+p	=>	
			<div></div>
			<p></p>
ul>li	=>
			<ul>
				<li></li>
			</ul>
ul>li^div	=>
			<ul>
        		<li></li>
    		</ul>
	    	<div></div>
(div>p>span)(ul>li)	=>
				<div>
			        <p><span></span></p>
			    </div>
    			<ul>
    	    		<li></li>
    			</ul>
```

##### 属性

```html
div#id	=>	<div id="id"></div>
div.class1.class2	=>	<div class="class1 class2"></div>
div#id.class1.class2	=>	<div id="id" class="class1 class2"></div>
div[attr="somt_text"]	=>	<div attr=""some_text></div>
div{text}	=>	<div>text</div>
```

##### MIX

此处举个例子剩下的自己开发吧

```
div#content.center>(h1{hello world}+div.header>p.top{This is test text. welcome to my WeNote.}+p{this is other test text.})(ul>.item$${this is first number $@3 and other number $$$}*10)
```

`print => `

```html
 <div id="content" class="center">
 	<h1>hello world</h1>
	<div class="header">
		<p class="top">This is test text. welcome to my WeNote.</p>
		<p>this is other test text.</p>
	</div>
	<ul>
		<li class="item01">this is first number 3 and other number 001</li>
		<li class="item02">this is first number 4 and other number 002</li>
		<li class="item03">this is first number 5 and other number 003</li>
		<li class="item04">this is first number 6 and other number 004</li>
		<li class="item05">this is first number 7 and other number 005</li>
		<li class="item06">this is first number 8 and other number 006</li>
		<li class="item07">this is first number 9 and other number 007</li>
		<li class="item08">this is first number 10 and other number 008</li>
		<li class="item09">this is first number 11 and other number 009</li>
		<li class="item10">this is first number 12 and other number 010</li>
	</ul>
</div>
```

### CSS

`css`部分就没这么多说的了虽然属性比较多但是规则更为统一便于使用

```css
/*先举个简单例子	fl	=>	*/
flot: left;
/* fll	=>	*/
flot: left;
/* flr	=>	*/
flot: right;
```

> 	提示：fll写的规范一点的样子是：fl:l 
> 	看到这里还没懂就继续往下看
> 	复杂的例子：

#### 解析

```css
/* bgcp:bb	=> */
background-clip:border-box;
```

来看到这个例子我们来解析一下：

首先说`bgcp`是啥意思，`bg`取自`background`这个单词的缩写`back`中的`b`；`ground`的中的`g`；

那接下来的`cp`是怎么来的，前面说到是取首字母，那我们这里取`clip`的首字母应该是`c`就ok了啊，为什么还有`p`呢？原因很简单你还记得有`background-color`这个属性吗如果最后这里是取`c`不是`cp`那么电脑怎么识别生成的是`color`还是`clip`呢？`:`之前代表属性名，之后代表属性那么`bb`就可以不用解释了吧。很多情况下`:`是可以省略的。

#### 实战起飞

接下来举一些小例子帮助理解一下，以后用`Emmet`能不能起飞看自己咯~~~

```
d	=>	display:block;
db	=>	display:block;	
	// 看到这里可以理解上面的fl和fll为啥生成的代码是一样的了吧
d:tbclg	=>	display:table-column-group;
	// 简写比较长的情况下是不能省略冒号的
tac	=>	text-align: center;
v	=>	visibility:hidden;
ovh	=>	over ow:hidden;
oh	=>	over ow:hidden;
w2r	=>	width: 2rem;
p2p	=>	padding: 2%;
bgpx20	=>	background-postion-x: 20px;
```