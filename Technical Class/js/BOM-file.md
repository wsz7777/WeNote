[TOC]

# BOM-file类型

## File 对象在哪里

```html
<input type="file" id="thisFile">
```

就是这个 `type` 为 `file` 的 `input` 元素中。在你选择文件后，他返回一个 `files` 对象。

## 读取文件（FileReader 对象）

我们通过 `FileReader` 对象去读取文件。返回在 `result` 中。

```js
// 获取 input 元素
var file = document.querySelectorAll('#thisFile');    //或者通过 getElementById() 获取

// new 一个读取文件的对象
var oFReader = new FileReader();
```

### 读取文件的方式（FileReader API）

```js
// 读取方式有三种
oFReader.readAsBinaryString(file.files[0])     // 读取为二进制编码
oFReader.readAsText(file.files[0])             // 读取为文本
oFReader.readAsDataURL(file.files[0])          // 读取为 DataURL 格式
```

### 读取文件时可触发的事件

| 事件名称    | 触发事件                   |
| ----------- | -------------------------- |
| onabort     | 读取中断                   |
| onerror     | 读取出错                   |
| onload      | 文件读取成功时             |
| onloadend   | 读取完成（不论成功或失败） |
| onloadstart | 读取开始                   |
| onprogress  | 读取中                     |

## 示例

本地预览图片：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <input type="file" name="" id="file">
    <div class="imgList"></div>
    <script>
        document.getElementById('file').onchange = function() {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(this.files[0])
            oFReader.onloadend = function() {
                var imgList = document.getElementsByClassName('imgList')[0];
                imgList.innerHTML = '<img src="' + this.result + '" alt=" ">';
            };
        }
    </script>
</body>
</html>
```

