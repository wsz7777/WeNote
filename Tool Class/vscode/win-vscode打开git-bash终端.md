[TOC]

# windows环境下使用vscode终端（gitbash）

1. 安装 `git`：<https://git-scm.com/download/win> 

2. 打开 `vscode`，使用快捷键`ctrl+shift+p` 然后在输入框中输入 `open user setting`并且选择它                          

3. 打开后会有两个视图，左侧为默认设置，右侧为你自己的设置

4. 在右侧的视图中 输入

   `"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"`

5. 上图中的路径为默认安装git的目录，如果你安装在其它盘里，需要先确定`bash.exe`的路径，然后填入双引号中。（这个地方需要注意下， `bash.exe` 是在 `bin` 目录下）

6. 按下快捷键   <code>Ctrl + &#96;</code> 调出`vscode`的终端（不出意外的话，下方的终端颜色变成彩色的了）

   

   

   

   



