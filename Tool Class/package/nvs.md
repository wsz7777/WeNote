[toc]

nvs 换源

```
nvs remote taobao https://npm.taobao.org/mirrors/node/
nvs remote default taobao
```

换回初始源

```
nvs remote default node
```
即可

## nvs安装新姿势

直接把里面这些预设改掉啦~~~~

方便国内同学玩耍

```
export NVS_HOME="$HOME/.nvs"
git clone https://gitee.com/wsz7777/nvs "$NVS_HOME"
. "$NVS_HOME/nvs.sh" install
```
