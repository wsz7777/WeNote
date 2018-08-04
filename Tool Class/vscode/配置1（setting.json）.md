[TOC]

# VS Code setting.json


## VS Code 设置简介

`mac`环境下`command` +` ,`打开设置页面，顶部有搜索栏，左侧为`默认设置`，右侧为`自定义设置`。自定义设置又分为两种，一种是`用户设置`另一种是`工作区设置`。

## 用户设置

```Json
// 将设置放入此文件中以覆盖默认设置
{
    // 基础配置star
    // 编辑区的设置
    "editor.quickSuggestions": {
        "other": true,
        "comments": false,
        "strings": true
    },
    "editor.minimap.enabled": false,//是否显示右侧代码缩略图
    "editor.snippetSuggestions": "top",// 提示中代码段优先展示
    "zenMode.centerLayout": false,// 在全屏模式（cmd+k z）中是否启用居中模式
    "window.zoomLevel": 0,
    "explorer.confirmDragAndDrop": false,//控制在资源管理器内拖放移动文件或文件夹时是否进行确认。
    "explorer.confirmDelete": false,//控制资源管理器是否应在删除文件到废纸篓时进行确认。
    
    // 工作台配置
    "workbench.iconTheme": "material-icon-theme",//指定图标主题 属性为插件名称
    "workbench.colorTheme": "One Dark Pro Vivid",//指定代码颜色主题 属性为插件名
  	"workbench.editor.enablePreview": false,//打开一个文件直接进入编辑而不是预览
    "workbench.editor.closeEmptyGroups": false,// 关闭最后一个标签时仍保留布局方式
    "workbench.editor.openSideBySideDirection": "right",// 拆分布局时，在右侧新增窗口
    
     // 操作文件的设置
    "explorer.confirmDragAndDrop": false,//拖动文件||文件夹时 是否要确认
    "explorer.confirmDelete": false, // 删除文件时是否要确认
    
    // emmet 的设置
    "emmet.triggerExpansionOnTab": true,// 按下 tab 键将展开 emmet 缩写
	"emmet.showSuggestionsAsSnippets": true,// 提供 emmet 语法编译后的预览
    "emmet.includeLanguages": {// 在默认不支持 Emmet 的语言中启用 Emmet 缩写功能
        "vue-html": "html",// 将 vue-html 和 html 关联映射
        "vue": "html"//将 vue 和 html 关联映射
    }
    
    // 基础配置end

    
    // some 进阶配置
    // easysass 编译scss&&sass的插件配置
    "easysass.formats": [
      	{
            "format": "expanded",//编译至css文件的格式，expanded:不压缩 | conpressed:压缩
            "extension": ".css"//生成css文件的后缀名,例如可以写成"min.css"
        }
    ],
    "easysass.targetDir": "./css/",// 生成的css的存放目录
    
  	// easy less 编译 less 的插件配置
	"less.compile": {
		"compress":  true,	// 是否压缩
		"out": "../css/",	// 输出到那个目录下，相对于less文件所在文件夹
		"outExt": ".css",	// 编译后生成css文件的文件后缀名
		"relativeUrls": true,	// 文件中的图片路径是否相对编译后的文件重新定向
		"sourceMap": true,	// 生成css.map文件 便于纠错
		"autoprefixer": "> 5%, last 2 Chrome versions, not ie 6-9" 
      		// 编译文件中属性自动添加兼容性前缀。此处仅作为语法列举，实际应用写成"> 5%"即可
      		// 请下载 autoprefixer 插件才能生效
    }
  
  	// jshint 的设置
  	"jshint.options": {
        "esversion": 6,	// 选择ES6的版本
        "eqeqeq": true	// 启用全等检测 推荐使用"===" 使用"=="会警告
    },
    
}
```

在实际配置中，你可以删除掉注释部分

## 工作区设置

这里区分一下`用户设置`和`工作区设置`

相同：都是用户自定义设置

不同：

​	`用户设置`是全局通用的自定义设置

​	`工作区设置`是仅此工作区有这样的自定义设置

我们用`工作区设置`来设置什么呢 举个例子：

​	我同时开发三个项目（三个项目分别简称A、B、C），A&B都用到`scss`但是编译路径以及编译格式不同。列一下要求：

| 项目名  | 生成css文件格式  | 生成css文件名后缀 | 编译路径                 |
| ---- | ---------- | ---------- | -------------------- |
| A    | compressed | .min.css   | ./src/assets/styles/ |
| B    | compressed | .css       | ./css/               |
| C    | expanded   | .css       | ./bulid/styles/      |

那这三个项目的工作区设置分别为：

A:

```json
{
    "easysass.formats": [
		{
             "format": "compressed",
             "extension": ".min.css"
         }
    ],
    "easysass.targetDir": "./src/assets/styles/"
}
```

B:

```json
{
    "easysass.formats": [
		{
             "format": "compressed",
             "extension": ".css"
         }
    ],
    "easysass.targetDir": "./css/"
}
```

C:

```json
{
    "easysass.formats": [
		{
             "format": "expanded",
             "extension": ".css"
         }
    ],
    "easysass.targetDir": "./bulid/styles/"
}
```



