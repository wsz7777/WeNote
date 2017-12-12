[TOC]

# VS Code config.json
config.json即配置文件，不多说上干货

```
// 将设置放入此文件中以覆盖默认设置
{
    // 基础配置star
    "editor.quickSuggestions": {
        "other": true,
        "comments": false,
        "strings": true
    },
    "workbench.iconTheme": "vscode-icons",
    "workbench.colorTheme": "Solarized Light",
    "window.zoomLevel": 0,
    // 基础配置end

    // some 进阶配置
    // easysass 编译scss&&sass的插件配置
    "easysass.formats": [{
            "format": "expanded",//编译至css文件的格式，expanded:不压缩 | conpressed:压缩
            "extension": ".css"//生成css文件的后缀名
        }
        // 例子：
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
    // "easysass.targetDir": "./src/assets/styles/",
    
    // 控制台，工作面板设置
    "workbench.editor.enablePreview": false,// 控制是否将打开的编辑器显示为预览
    "workbench.panel.location": "bottom",// 控制台在底部显示
    
    // 一些图标设置
    "vsicons.projectDetection.autoReload": true,
    "vsicons.presets.angular": true,
    "vsicons.presets.tsOfficial": true,
    "vsicons.presets.jsonOfficial": true,
    
    // 编辑时的设置
    "editor.minimap.enabled": false,//是否显示右侧代码缩略图
    
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