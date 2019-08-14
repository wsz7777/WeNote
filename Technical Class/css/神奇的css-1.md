[TOC]

# 简单的css
## 使鼠标消失
使用定义鼠标样式的属性`cursor`
```Css
* {
    cursor: none;
}
```

## 文字模糊
使用文字阴影效果属性`text-shadow`
透明色：transparent
```Css
*{
    color: transparent;
    text-shadow: #000 0 0 5px;
}
```

## 多重边框
使用区域阴影效果属性`box-shadow`
```Css
.div1{
    box-shaow: inset 10px 10px 10px 10px rgba(0,0,0,0.2);
    /* 
    box-shadow: [内部(inset)/外部(默认)] <X轴偏移量> <Y轴偏移量> <阴影模糊量> [阴影面积缩放值] <color>
    */
}

/* 可以无限加边框的方式 */
.div2{
    box-shadow: 
        inset 10px 10px 10px 2px rgba(0,0,0,0.2),
        10px 10px 10px rgba(0,0,255,0.9),
        20px 20px 10px rgba(0,255,0,0.5),
        30px 30px 10px rgba(255,0,0,0.3),
        40px 40px 10px rgba(255,255,0,0.3);
}
```

