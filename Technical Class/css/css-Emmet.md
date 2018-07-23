[TOC]

# Emmet的css语法

`Emmet` 语法针对 `css` 有极其强大的帮助，能然我们快速完成样式的书写。和 `html` 一样简写完属性后按 `tab` 键直接完成代码。

## 简写属性

### 数字属性

#### 基础

```Css
/* 例如简写宽度 */
w100   =>  width: 100px;
w100p  =>  width: 100%;
w100e  =>  width: 100em;
w100r  =>  width: 100rem;
/*
 * 延伸：
 * [属性][数字][任意字母] => [属性]: [数字][任意字母]
**/
```

#### 进阶

短横线：连接/符号

```css
m10-20    =>  margin: 10px 20px;       不带单位，一条短横线
m10--20   =>  margin: 10px -20px;      不带单位，两条短横线
m10px20px =>  margin: 10px 20px;       带单位
m10r-20r  =>  margin: 10rem -20rem;    带单位，一条短横线
```

加号：多条语句连接

```Css
df+jcc+aic =>
	display: flex;
    justify-content: center;
    align-items: center;
```

复杂式

```Css
bd5#f60s  =>  border: 5px #ff6600 solid;
```



## 属性对照表

属性太多了。。。还得靠自己找规律但是有几个命名空间记住就好

### 盒子模型

| 命名空间 | 对应属性         |
| -------- | ---------------- |
| w        | width            |
| h        | height           |
| m + t \ r \ b \ l | margin - top \ right \ bottom \ left |
| p + t \ r \ b \ l | padding - top \ right \ bottom \ left |
| bd + t \ r \ b \ l \ w \ s \ c | border - top \ right \ bottom \ left \ width \ style \ color |
| bx | box-sizing |
| bdrs | border-radius |
| d + b \ i \ ib | display: block \ inline \ inline-block; |
| fl \ flr | float: left \ float: right |
| cl       | clear: both      |
| bg + c \ i \ r \ s \ p \ a \ o \ cp | background - color \ image \ repreat \ size \ position \  attachment \ origin \ clip |

### 定位

| 命名空间        | 对应属性                               |
| --------------- | -------------------------------------- |
| poa \ por \ pof | position: absolute \ relative \ fixed; |
| t \ r \ b \ l   | top \ right \ bottom \ left            |
| z               | z-index                                |


### 文字

| 命名空间 | 对应属性    |
| -------- | ----------- |
| c        | color       |
| fz       | font-size   |
| fw       | font-weight |
| fs       | font-style  |
| lh       | line-height |


### Flexbox

| 命名空间                   | 对应属性                                                     |
| -------------------------- | ------------------------------------------------------------ |
| df                         | display: flex;                                               |
| jc + fs \ fe \ c \ sb \ sa | justify-content:  flex-start \  flex-end \ center \  space-between \  space-around; |
| fx                         | flex                                                         |
| fxd + c \ r \ cr \ rr      | flex-direction: colum \ row \  column-reverse \  row-reverse ; |
| fxw + w \ n                | flex-wrap: wrap \ no-wrap;                                   |
| ai + fs \ fe \ c           | align-items: flex-start \  flex-end \ center;                |