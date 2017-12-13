[TOC]

# 为什么阻止事件冒泡
```javascript
// 后期用户体验优化
$(".alertbg").on("touchend", function() {
    $(this).fadeOut();
    donaheight();
});
```
这段代码是关掉模态框的时候做用户体验优化所添加的，实现的效果是点击模态框之外黑色区域同样可以干掉模态框。但是出了一个问题点击模态框中的按钮时也把模态框干掉了。也就是因为事件冒泡的原因：点击父元素中的一个子元素触发父元素的事件。所以我们怎么解决呢？
# Function
## 阻止事件冒泡
加上这段代码
```javascript
$(".alertbg").children().on("touchend", function(event) {
    event.stopPropagation();
});
```
触摸完这个模态框的子元素内的元素，之后直接`event.stopPropagation();`阻止事件冒泡。这样就可以实现开头想要的效果。
## 阻止默认事件发生
```javascript
$(".alertbg").children().on("touchend", function() {
    return false;
});
```
这样直接`return false`去停止默认事件发生，这样也可以实现篇头的效果。

建议：如果是在开发阶段记得在每个按钮绑定完事件后加`return false`不过大家还是要搞清需求之后再确定取消。

> 2017.12.13新增补充
>
> `keyup`、`keydown`等事件不适合用`return false;`来解决。他会阻止掉你的输入结果的实现。

## 另一种阻止默认事件发生的方法
```javascript
$('input[type="submit"]').on("click", function(event) {
    /*
    *   功能代码
    */
    event.preventDefault();   // 阻止表单提交
});
```
## 辨析
阻止默认事件和阻止事件冒泡是不相等的

事件冒泡：
子元素与父元素绑定的触发事件相同时，点击子元素会同时触发绑定在父元素上的function。例如本篇开头说的例子，父子元素同时都绑定`click`事件，而且各自有执行的效果。

默认事件：
例如表单元素 `<input type="submit" />`点击这个按钮后会提交表单，加上`event.preventDefault();`这行代码会使它不提交表单，效果只是一个普通按钮。