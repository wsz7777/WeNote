[TOC]

# jquery动画效果
## animate()
语法：
`animate({css},[speed],[easing],[fn])`
参数：
***css：***一组包含作为动画属性和终值的样式属性和及其值的集合
***speed：***三种预定速度之一的字符串("slow","normal", or "fast")或表示动画时长的毫秒数值(如：1000)
***easing：***要使用的擦除效果的名称(需要插件支持).默认jQuery提供"linear" 和 "swing".
***fn：***在动画完成时执行的函数，每个元素执行一次。

## 单次动画
```
function an() {
    $(".user-donainfo").css("margin-top", "0").animate({ marginTop: "-12.6rem" }, 3000, "linear");
};
```
这个是一个单次滚动的方法。

## 动画无限循环
最后一个参数是回调函数作为参数的。
这个就是利用回调函数和自执行函数来实现的。
```

```

```
(function an() {
    $(".user-donainfo").css("margin-top", "0").animate({ marginTop: "-12.6rem" }, 3000, "linear", function() {
        $(".user-donainfo").css("margin-top", "0").animate({ marginTop: "-12.6rem" }, 3000, "linear", an);
    });
})();
```