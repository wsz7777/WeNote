[TOC]

# 关于VS Code的智障提示的解决办法

## 状态

本想生成`top:auto;`输入`t:a`然后按`tab`键就会出现各种智障提示生成的代码例如`t:active`之类的。再比如想写`vertical-align: top;`输入`va`结果更是一堆智障提示

## function

虽然网上有诸多解决办法但是我感觉更zz。。。。

### 解决思路

`tab`、`enter`两个键都会选取建议并生成代码，所以用`enter`来选取建议用`tab`来生成`emmet`语法想生成的代码。说白了：直接阻止掉`tab`键的选取建议事件。

### 解决操作

打开`VS Code`，然后进入`首选项` —>`键盘快捷方式`（或者直接`command K+command S` 打开`windows`用户把`command`替换为`CtrL`键）然后打开高级自定义的文件 `keybindings.json` （该入口在搜索框下的灰色提示）加一段代码：

```javascript
{  
	"key": "tab",                     
	"command": "editor.emmet.action.expandAbbreviation",                        
	"when": "config.emmet.triggerExpansionOnTab && editorTextFocus && !editorHasMultipleSelections && !editorHasSelection && !editorReadonly && !editorTabMovesFocus"   
}
```

## 新版vscode

1.19版本以后的 `vscode` 在`Emmet`语法上做的不错了，默认建议为第一项，不过还是有些地方不是很舒服。不过一直在往好的方向改进，加油，期待明年更强大的 `VS Code` 的出世