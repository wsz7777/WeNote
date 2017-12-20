[TOC]

# VS Code config.json
config.json即配置文件

## VS Code 设置简介

`mac`环境下`command` +` ,`打开设置页面，顶部有搜索栏，左侧为`默认设置`，右侧为`自定义设置`。自定义设置又分为两种，一种是`用户设置`另一种是`工作区设置`。

## 用户设置

```Json
// 将设置放入此文件中以覆盖默认设置
{
    // 基础配置star
    // 编辑时的设置
    "editor.quickSuggestions": {
        "other": true,
        "comments": false,
        "strings": true
    },
    "editor.minimap.enabled": false,//是否显示右侧代码缩略图
    "workbench.iconTheme": "vscode-icons",
    "workbench.colorTheme": "Solarized Light",
    "window.zoomLevel": 0,
    // 基础配置end

    // some 进阶配置
    // easysass 编译scss&&sass的插件配置
    "easysass.formats": [
      	{
            "format": "expanded",//编译至css文件的格式，expanded:不压缩 | conpressed:压缩
            "extension": ".css"//生成css文件的后缀名
        }
        // eg：
        //压缩scss编译的css
        // {
        //     "format": "compressed",
        //     "extension": ".min.css"
        // },
        //不压缩scss编译的css
        // {
        //     "format": "compressed",
        //     "extension": ".css"
        // }
    ],
    // 生成的css的存放目录
    "easysass.targetDir": "./css/",
    
    // 控制台，工作面板设置
    "workbench.editor.enablePreview": false,// 控制是否将打开的编辑器显示为预览
    "workbench.panel.location": "bottom",// 控制台在底部显示
    
    // 一些图标设置
    "vsicons.projectDetection.autoReload": true,
    "vsicons.presets.angular": true,
    "vsicons.presets.tsOfficial": true,
    "vsicons.presets.jsonOfficial": true,
    
    
    
    // 操作文件的设置
    "explorer.confirmDragAndDrop": false,//拖动文件||文件夹时 是否要确认
    "explorer.confirmDelete": false, // 删除文件时是否要确认
    
    // emmet 的设置
    "emmet.triggerExpansionOnTab": true,// 按下tab键将展开emmet缩写
    "emmet.includeLanguages": {// 在默认不支持 Emmet 的语言中启用 Emmet 缩写功能
        "vue-html": "html",// 将 vue-html 和 html 关联映射
        "vue": "html"//将 vue 和 html 关联映射
    }
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



