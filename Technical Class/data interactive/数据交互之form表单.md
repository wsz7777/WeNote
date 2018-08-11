# 数据交互之form表单

**先来看一个最简单的一个form表单：**

```html
<form action="/接口" id="test">
<input type="text" name="data" value="obj">
</form>
```

**注**：action:你所要传值的接口。

​	name:你所传的键。（相当于你用ajax中data属性中的键）

​	value:你所传的值。（相当于你用ajax中data属性中的值）

​	data{

​	name:value==data:obj

​	}

### 如何提交form表单：

可用Ajax的ajaxSubmit方法提交form表单。

1 、引入依赖脚本。

```javascript
<script type="text/javascript" src="/js/jquery/jquery.form.js"></script>   //ajaxForm 依赖脚本  
```

脚本下载地址  <http://download.csdn.net/detail/yjqyyjw/9488464>

2、调用此方法：

如：

```
$('#test').ajaxSubmit({
    type: 'post',
    dataType: 'json',
    success: function(json) {
    
    }
})
```