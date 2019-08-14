[TOC]

# grep 筛选

​	筛选命令配合 `|` 这个符号使用在各中查询命令中，这个符号叫做管道符。管道符的作用就是将前一个命令结果作为后面命令的操作对象。

## 举例

### 查询进程

```bash
$ ps aux | grep node

root     11388  0.0  0.0 112704   976 pts/2    S+   19:42   0:00 grep --color=auto node
root     24000  0.0  1.0 925904 39180 ?        Ssl  Jul25   1:17 node /xxx/xxx/xxx/xx.js
```

`ps` 为查询命令， `aux` 是查询的参数，查询出来的结果通过管道符给 `grep` 命令执行，`grep` 后面跟的条件为筛选项。

### 查询指定安装包

```Bash
$ npm list -g | grep express

│ │ │ ├── spdx-expression-parse@3.0.0 deduped
│ │ └─┬ spdx-expression-parse@3.0.0
│ │ │ └─┬ spdx-expression-parse@1.0.2
```

这条命令是在全局搜索 `npm` 包是否安装了包含有 `express` 这个名称的包。

```Bash
$ yum list | grep mysql

Repository epel is listed more than once in the configuration
akonadi-mysql.x86_64                      1.9.2-4.el7                    os
apr-util-mysql.x86_64                     1.5.2-6.el7                    os
calligra-kexi-driver-mysql.x86_64         2.9.10-2.el7                   epel
....
zabbix22-server-mysql.x86_64              2.2.21-1.el7                   epel
zabbix22-web-mysql.noarch                 2.2.21-1.el7                   epel
```

这是在 `yum` 可安装包中筛选出名称含有 `mysql` 的包。